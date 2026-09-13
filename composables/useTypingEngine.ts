import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { compareClusters } from '~/lib/khmer/compare'
import { segmentKhmer } from '~/lib/khmer/graphemes'
import { normalizeKhmer } from '~/lib/khmer/normalize'
import { generateTest } from '~/lib/test-generator'
import { isGuidedInputValid, nextKeystroke } from '~/lib/keyboard-guide'
import type { TestResult } from '~/types/typing'

export function useTypingEngine() {
  const typing = useTypingStore()
  const settings = useSettingsStore()
  const stats = useStatsStore()

  const target = ref('')
  const rawInput = ref('')
  const acceptedInput = ref('')
  const composing = ref(false)
  const startedAt = ref<number | null>(null)
  const elapsed = ref(0)
  const finished = ref(false)
  const focused = ref(false)
  const activeCode = ref('')
  const samples = ref<number[]>([])
  const guidedMistakes = ref(0)
  const guideFeedback = ref<'idle' | 'correct' | 'incorrect'>('idle')
  let ticker: ReturnType<typeof setInterval> | undefined
  let feedbackTimer: ReturnType<typeof setTimeout> | undefined
  let seed = Date.now()

  const durationLimit = computed(() => typing.mode === 'time' ? typing.parameter : 0)
  const remaining = computed(() => Math.max(0, durationLimit.value - Math.floor(elapsed.value)))
  const clusters = computed(() => compareClusters(target.value, rawInput.value, {
    mode: settings.comparisonMode,
    composing: composing.value,
    commitPending: finished.value,
  }))
  const correct = computed(() => clusters.value.filter(cluster => cluster.state === 'correct').length)
  const incorrect = computed(() => clusters.value.filter(cluster => cluster.state === 'incorrect').length + guidedMistakes.value)
  const typedCount = computed(() => correct.value + incorrect.value)
  const accuracy = computed(() => typedCount.value ? Math.round(correct.value / typedCount.value * 100) : 100)
  const minutes = computed(() => Math.max(elapsed.value / 60, 1 / 60))
  const rawWpm = computed(() => Math.round((segmentKhmer(rawInput.value).length / 5) / minutes.value))
  const wpm = computed(() => Math.max(0, Math.round(rawWpm.value * accuracy.value / 100)))
  const progress = computed(() => {
    if (typing.mode === 'time') return durationLimit.value ? elapsed.value / durationLimit.value : 0
    const total = Math.max(1, segmentKhmer(target.value).length)
    return Math.min(1, segmentKhmer(rawInput.value).length / total)
  })

  function start() {
    if (startedAt.value || finished.value) return
    startedAt.value = performance.now()
    ticker = setInterval(tick, 100)
  }

  function tick() {
    if (!startedAt.value || finished.value) return
    elapsed.value = (performance.now() - startedAt.value) / 1000
    const second = Math.floor(elapsed.value)
    if (samples.value.length <= second) samples.value.push(wpm.value)
    if (durationLimit.value && elapsed.value >= durationLimit.value) finish()
  }

  function createResult(): TestResult {
    const sampleValues = samples.value.length ? samples.value : [wpm.value]
    const average = sampleValues.reduce((sum, value) => sum + value, 0) / sampleValues.length
    const variance = sampleValues.reduce((sum, value) => sum + Math.abs(value - average), 0) / sampleValues.length
    return {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      createdAt: new Date().toISOString(),
      mode: typing.mode,
      parameter: typing.parameter,
      wpm: wpm.value,
      rawWpm: rawWpm.value,
      accuracy: accuracy.value,
      consistency: Math.max(0, Math.round(100 - (average ? variance / average * 100 : 0))),
      correct: correct.value,
      incorrect: incorrect.value,
      duration: Math.max(1, Math.round(elapsed.value)),
      samples: [...sampleValues],
    }
  }

  function finish() {
    if (finished.value || !startedAt.value) return
    elapsed.value = (performance.now() - startedAt.value) / 1000
    if (durationLimit.value) elapsed.value = Math.min(elapsed.value, durationLimit.value)
    finished.value = true
    if (ticker) clearInterval(ticker)
    stats.add(createResult())
  }

  function restart(newText = true) {
    if (ticker) clearInterval(ticker)
    rawInput.value = ''
    acceptedInput.value = ''
    startedAt.value = null
    elapsed.value = 0
    finished.value = false
    composing.value = false
    samples.value = []
    guidedMistakes.value = 0
    guideFeedback.value = 'idle'
    activeCode.value = ''
    if (newText || !target.value) {
      seed += 1
      target.value = normalizeKhmer(generateTest(typing.mode, typing.parameter, typing.punctuation, typing.numbers, seed))
    }
  }

  function showGuideFeedback(value: 'correct' | 'incorrect') {
    guideFeedback.value = value
    if (feedbackTimer) clearTimeout(feedbackTimer)
    feedbackTimer = setTimeout(() => { guideFeedback.value = 'idle' }, 550)
  }

  function setInput(value: string) {
    if (finished.value) return
    if (value && !startedAt.value) start()
    if (composing.value) {
      rawInput.value = value
      return
    }

    const previousLength = Array.from(acceptedInput.value).length
    const candidateLength = Array.from(value).length
    const isDeletion = candidateLength < previousLength
    const mustBeCorrect = settings.guidedMode && settings.correctOnly
    const valid = !mustBeCorrect || isDeletion || isGuidedInputValid(target.value, value)

    if (!valid) {
      rawInput.value = acceptedInput.value
      guidedMistakes.value += 1
      showGuideFeedback('incorrect')
      return
    }

    acceptedInput.value = value
    rawInput.value = value
    if (candidateLength > previousLength) showGuideFeedback('correct')
    const targetLength = segmentKhmer(target.value).length
    if (typing.mode !== 'time' && segmentKhmer(value).length >= targetLength) finish()
  }

  function endComposition(value: string) {
    composing.value = false
    setInput(value)
  }

  function keyDown(event: KeyboardEvent) {
    activeCode.value = event.code
    const ignored = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Shift', 'Control', 'Alt', 'Meta'].includes(event.key)
    if (settings.guidedMode && !ignored) {
      const expected = nextKeystroke(target.value, acceptedInput.value)
      if (expected) {
        const matches = event.code === expected.code && event.shiftKey === expected.shift
        showGuideFeedback(matches ? 'correct' : 'incorrect')
      }
    }
    if (event.key === 'Tab' || (event.key === 'Enter' && event.shiftKey)) {
      event.preventDefault()
      restart()
    }
  }

  function keyUp(event: KeyboardEvent) {
    if (activeCode.value === event.code) activeCode.value = ''
  }

  watch(() => [typing.mode, typing.parameter, typing.punctuation, typing.numbers], () => restart())
  onBeforeUnmount(() => {
    if (ticker) clearInterval(ticker)
    if (feedbackTimer) clearTimeout(feedbackTimer)
  })

  return {
    target, rawInput, acceptedInput, composing, startedAt, elapsed, finished, focused, activeCode,
    guideFeedback, guidedMistakes,
    clusters, correct, incorrect, accuracy, rawWpm, wpm, remaining, progress,
    restart, finish, setInput, endComposition, keyDown, keyUp,
  }
}
