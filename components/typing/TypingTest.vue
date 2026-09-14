<script setup lang="ts">
import { nextKeystroke } from '~/lib/keyboard-guide'

const engine = useTypingEngine()
const typing = useTypingStore()
const settings = useSettingsStore()
const stats = useStatsStore()
const typingText = ref<{ focus: () => void }>()

const latestResult = computed(() => engine.finished.value ? stats.results[0] : undefined)
const guide = computed(() => nextKeystroke(engine.target.value, engine.acceptedInput.value))
const activeClusterIndex = computed(() => engine.clusters.value.findIndex(cluster => cluster.state !== 'correct'))
const activeCluster = computed(() => activeClusterIndex.value < 0 ? '' : engine.clusters.value[activeClusterIndex.value]?.expected ?? '')
const typedInActiveCluster = computed(() => {
  if (activeClusterIndex.value < 0) return 0
  const before = engine.clusters.value
    .slice(0, activeClusterIndex.value)
    .reduce((total, cluster) => total + Array.from(cluster.expected).length, 0)
  return Math.max(0, Array.from(engine.acceptedInput.value).length - before)
})

function restart() {
  engine.restart(true)
  nextTick(() => typingText.value?.focus())
}

function onKeydown(event: KeyboardEvent) {
  engine.keyDown(event)
  if (event.key === 'Tab' && !event.shiftKey) {
    event.preventDefault()
    restart()
  }
  if (event.key === 'Escape') (event.target as HTMLElement).blur()
}

onMounted(() => {
  stats.hydrate()
  engine.restart(true)
})
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div v-if="!engine.finished.value" class="flex flex-1 flex-col justify-start py-4 sm:py-5">
      <div
        class="mx-auto flex h-10 w-full max-w-3xl items-center gap-4"
      >
        <TestToolbar />

        <div class="flex min-w-0 flex-1 items-center gap-3 transition-opacity duration-200" :class="engine.startedAt.value ? 'opacity-100' : 'opacity-0'" :aria-hidden="!engine.startedAt.value">
          <span v-if="typing.mode === 'time'" class="w-8 text-right text-xs tabular-nums text-accent">{{ engine.remaining.value }}s</span>
          <div
            class="h-0.5 flex-1 overflow-hidden rounded-full bg-faint"
            role="progressbar"
            aria-label="វឌ្ឍនភាព"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="Math.round(engine.progress.value * 100)"
          >
            <div class="h-full rounded-full bg-accent transition-[width] duration-100" :style="{ width: `${Math.min(100, engine.progress.value * 100)}%` }" />
          </div>
          <span v-if="typing.mode !== 'time'" class="w-8 text-xs tabular-nums text-muted">{{ Math.round(engine.progress.value * 100) }}%</span>
        </div>
      </div>

      <TypingText
        ref="typingText"
        :model-value="engine.rawInput.value"
        :clusters="engine.clusters.value"
        :focused="engine.focused.value"
        :finished="engine.finished.value"
        @update:model-value="engine.setInput"
        @focus="engine.focused.value = true"
        @blur="engine.focused.value = false"
        @compositionstart="engine.composing.value = true"
        @compositionend="engine.endComposition"
        @keydown="onKeydown"
        @keyup="engine.keyUp"
      />

      <div class="mb-8 flex items-center justify-center gap-6 text-xs text-muted">
        <span><kbd class="rounded bg-muted px-2 py-1 text-page">tab</kbd> + <kbd class="rounded bg-muted px-2 py-1 text-page">enter</kbd> ចាប់ផ្ដើមថ្មី</span>
        <span class="hidden sm:inline"><kbd class="rounded bg-muted px-2 py-1 text-page">esc</kbd> ផ្អាក</span>
      </div>

      <div v-if="settings.guidedMode" class="mx-auto mb-2 flex w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-panel sm:flex-row">
        <TypingGuide
          :keystroke="guide"
          :feedback="engine.guideFeedback.value"
        />
        <KhmerClusterCoach :cluster="activeCluster" :typed-codepoints="typedInActiveCluster" />
        <div class="flex min-h-12 w-full shrink-0 items-center justify-end gap-3 border-t border-faint px-4 text-[9px] text-muted sm:min-h-14 sm:w-auto sm:border-l sm:border-t-0" aria-label="Live typing metrics">
          <span><b class="mr-1 text-sm font-normal text-text">{{ engine.wpm.value }}</b>wpm</span>
          <span><b class="mr-1 text-sm font-normal" :class="engine.accuracy.value < 90 ? 'text-danger' : 'text-accent'">{{ engine.accuracy.value }}%</b>acc</span>
        </div>
      </div>

      <KhmerKeyboard
        v-if="settings.showKeyboard"
        :active-code="engine.activeCode.value"
        :guide="settings.guidedMode ? guide : undefined"
      />
    </div>

    <TestResults v-else-if="latestResult" :result="latestResult" @restart="restart" />
  </div>
</template>
