<script setup lang="ts">
const typing = useTypingStore()
const modeOptions = [
  { value: 'words', label: 'ពាក្យ' },
  { value: 'time', label: 'ពេល' },
  { value: 'syllables', label: 'មូលដ្ឋាន' },
] as const
const parameters = computed(() => {
  if (typing.mode === 'syllables') return [5, 10, 20, 30]
  if (typing.mode === 'words') return [10, 25, 50, 100]
  return [15, 30, 60, 120]
})
const modeLabel = computed(() => modeOptions.find(option => option.value === typing.mode)?.label ?? 'ពាក្យ')
const parameterLabel = computed(() => typing.mode === 'time' ? 'វិ.' : typing.mode === 'syllables' ? 'ក្រុម' : 'ពាក្យ')

function selectMode(mode: 'syllables' | 'time' | 'words') {
  typing.mode = mode
  if (mode === 'syllables' && ![5, 10, 20, 30].includes(typing.parameter)) typing.parameter = 10
  if (mode === 'words' && ![10, 25, 50, 100].includes(typing.parameter)) typing.parameter = 25
  if (mode === 'time' && ![15, 30, 60, 120].includes(typing.parameter)) typing.parameter = 30
}

function onModeChange(event: Event) {
  selectMode((event.target as HTMLSelectElement).value as 'syllables' | 'time' | 'words')
}

function onParameterChange(event: Event) {
  typing.parameter = Number((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="flex h-9 shrink-0 items-center rounded-xl bg-panel p-1 text-xs shadow-[0_8px_24px_rgba(0,0,0,.07)]">
    <label class="relative">
      <span class="sr-only">ប្រភេទលំហាត់</span>
      <select
        :value="typing.mode"
        class="focus-ring h-7 appearance-none rounded-lg bg-transparent py-1 pl-2.5 pr-7 text-accent outline-none transition hover:bg-faint"
        :aria-label="`ប្រភេទ៖ ${modeLabel}`"
        @change="onModeChange"
      >
        <option v-for="option in modeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted">⌄</span>
    </label>

    <span class="h-4 w-px bg-faint" aria-hidden="true" />

    <label class="relative flex items-center">
      <span class="sr-only">ប្រវែងលំហាត់</span>
      <select
        :value="typing.parameter"
        class="focus-ring h-7 appearance-none rounded-lg bg-transparent py-1 pl-2.5 pr-7 text-text outline-none transition hover:bg-faint"
        :aria-label="`ប្រវែង៖ ${typing.parameter} ${parameterLabel}`"
        @change="onParameterChange"
      >
        <option v-for="value in parameters" :key="value" :value="value">{{ value }}</option>
      </select>
      <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted">⌄</span>
    </label>

    <span class="hidden pr-2 text-[9px] text-muted sm:inline">{{ parameterLabel }}</span>
  </div>
</template>
