<script setup lang="ts">
const typing = useTypingStore()
const settings = useSettingsStore()
const toolbar = ref<HTMLElement>()
const open = ref(false)
const modeOptions = [
  { value: 'words', label: 'ពាក្យ' },
  { value: 'time', label: 'ពេល' },
  { value: 'quote', label: 'ឃ្លា' },
  { value: 'syllables', label: 'មូលដ្ឋាន' },
] as const
const parameters = computed(() => {
  if (typing.mode === 'syllables') return [5, 10, 20, 30]
  if (typing.mode === 'words') return [10, 25, 50, 100]
  return [15, 30, 60, 120]
})
const modeLabel = computed(() => modeOptions.find(option => option.value === typing.mode)?.label ?? 'ពាក្យ')

const summary = computed(() => typing.mode === 'quote' ? modeLabel.value : `${modeLabel.value} · ${typing.parameter}`)

function selectMode(mode: 'syllables' | 'time' | 'words' | 'quote') {
  typing.mode = mode
  if (mode === 'syllables' && ![5, 10, 20, 30].includes(typing.parameter)) typing.parameter = 10
  if (mode === 'words' && ![10, 25, 50, 100].includes(typing.parameter)) typing.parameter = 25
  if (mode === 'time' && ![15, 30, 60, 120].includes(typing.parameter)) typing.parameter = 30
}

function selectParameter(value: number) {
  typing.parameter = value
  open.value = false
}

function togglePunctuation() {
  typing.punctuation = !typing.punctuation
}

function toggleNumbers() {
  typing.numbers = !typing.numbers
}

function toggleKeyboard() {
  settings.showKeyboard = !settings.showKeyboard
  settings.persist()
}

function toggleGuidedMode() {
  settings.guidedMode = !settings.guidedMode
  if (!settings.guidedMode) settings.correctOnly = false
  settings.persist()
}

function toggleCorrectOnly() {
  settings.correctOnly = !settings.correctOnly
  if (settings.correctOnly) settings.guidedMode = true
  settings.persist()
}

function closeOnOutside(event: PointerEvent) {
  if (!toolbar.value?.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('pointerdown', closeOnOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOnOutside))
</script>

<template>
  <div ref="toolbar" class="relative shrink-0">
    <button
      type="button"
      class="focus-ring grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-panel hover:text-text"
      :class="open ? 'bg-panel text-accent' : ''"
      :aria-label="`កំណត់លំហាត់៖ ${summary}`"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="open = !open"
    >
      <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current" aria-hidden="true"><path d="M4 6h9v2H4V6Zm13-2h2v2h2v2h-2v2h-2V8h-2V6h2V4ZM4 11h3v2H4v-2Zm7-2h2v2h8v2h-8v2h-2v-2H9v-2h2V9Zm-7 7h11v2H4v-2Zm15-2h-2v2h-1v2h1v2h2v-2h2v-2h-2v-2Z"/></svg>
    </button>

    <div v-if="open" class="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-faint bg-panel p-3 text-xs shadow-2xl" role="dialog" aria-label="កំណត់លំហាត់">
      <div class="mb-3 flex items-center justify-between">
        <p class="font-medium text-text">កំណត់លំហាត់</p>
        <span class="text-[9px] text-muted">{{ summary }}</span>
      </div>

      <p class="mb-1.5 text-[9px] text-muted">របៀបហាត់</p>
      <div class="grid grid-cols-4 gap-1" role="group" aria-label="ជ្រើសរបៀបហាត់">
        <button
          v-for="option in modeOptions"
          :key="option.value"
          type="button"
          class="focus-ring rounded-lg px-2 py-2 text-muted transition hover:bg-faint hover:text-text"
          :class="typing.mode === option.value ? 'bg-page text-accent' : ''"
          :aria-pressed="typing.mode === option.value"
          @click="selectMode(option.value)"
        >
          {{ option.label }}
        </button>
      </div>

      <template v-if="typing.mode !== 'quote'">
        <p class="mb-1.5 mt-3 text-[9px] text-muted">ប្រវែងលំហាត់</p>
        <div class="grid grid-cols-4 gap-1" role="group" aria-label="ជ្រើសប្រវែងលំហាត់">
          <button
            v-for="value in parameters"
            :key="value"
            type="button"
            class="focus-ring rounded-lg px-2 py-2 text-muted transition hover:bg-faint hover:text-text"
            :class="typing.parameter === value ? 'bg-page text-accent' : ''"
            :aria-pressed="typing.parameter === value"
            @click="selectParameter(value)"
          >
            {{ value }}
          </button>
        </div>
      </template>

      <template v-if="typing.mode === 'words' || typing.mode === 'time'">
        <p class="mb-1.5 mt-3 text-[9px] text-muted">មាតិកា</p>
        <div class="grid grid-cols-2 gap-1" role="group" aria-label="ជម្រើសមាតិកា">
          <button type="button" class="focus-ring rounded-lg px-3 py-2 text-muted transition hover:bg-faint hover:text-text" :class="typing.punctuation ? 'bg-page text-accent' : ''" :aria-pressed="typing.punctuation" @click="togglePunctuation">សញ្ញា ។</button>
          <button type="button" class="focus-ring rounded-lg px-3 py-2 text-muted transition hover:bg-faint hover:text-text" :class="typing.numbers ? 'bg-page text-accent' : ''" :aria-pressed="typing.numbers" @click="toggleNumbers">លេខ ១២៣</button>
        </div>
      </template>

      <p class="mb-1.5 mt-3 text-[9px] text-muted">ជំនួយវាយ</p>
      <div class="grid grid-cols-3 gap-1" role="group" aria-label="ជម្រើសជំនួយវាយ">
        <button type="button" class="focus-ring rounded-lg px-2 py-2 text-muted transition hover:bg-faint hover:text-text" :class="settings.showKeyboard ? 'bg-page text-accent' : ''" :aria-pressed="settings.showKeyboard" @click="toggleKeyboard">ក្ដារចុច</button>
        <button type="button" class="focus-ring rounded-lg px-2 py-2 text-muted transition hover:bg-faint hover:text-text" :class="settings.guidedMode ? 'bg-page text-accent' : ''" :aria-pressed="settings.guidedMode" @click="toggleGuidedMode">ណែនាំ</button>
        <button type="button" class="focus-ring rounded-lg px-2 py-2 text-muted transition hover:bg-faint hover:text-text" :class="settings.correctOnly ? 'bg-page text-accent' : ''" :aria-pressed="settings.correctOnly" @click="toggleCorrectOnly">វាយត្រូវ</button>
      </div>
    </div>
  </div>
</template>
