<script setup lang="ts">
const typing = useTypingStore()
const modeOptions = [
  { value: 'words', label: 'ពាក្យ', icon: 'A' },
  { value: 'time', label: 'ពេល', icon: '◷' },
  { value: 'syllables', label: 'មូលដ្ឋាន', icon: 'ក' },
] as const
const parameters = computed(() => {
  if (typing.mode === 'syllables') return [5, 10, 20, 30]
  if (typing.mode === 'words') return [10, 25, 50, 100]
  return [15, 30, 60, 120]
})
function selectMode(mode: 'syllables' | 'time' | 'words') {
  typing.mode = mode
  if (mode === 'syllables' && ![5, 10, 20, 30].includes(typing.parameter)) typing.parameter = 10
  if (mode === 'words' && ![10, 25, 50, 100].includes(typing.parameter)) typing.parameter = 25
  if (mode === 'time' && ![15, 30, 60, 120].includes(typing.parameter)) typing.parameter = 30
}
</script>

<template>
  <div class="mx-auto max-w-full overflow-x-auto pb-1">
    <div class="mx-auto flex w-max items-center gap-1 rounded-2xl bg-panel p-1.5 text-xs text-muted shadow-[0_12px_32px_rgba(0,0,0,.08)] sm:text-sm">
      <div class="flex shrink-0 items-center gap-0.5" role="group" aria-label="ប្រភេទលំហាត់">
        <button
          v-for="option in modeOptions"
          :key="option.value"
          class="focus-ring flex h-9 items-center gap-1.5 rounded-lg px-2.5 transition hover:text-text sm:px-3"
          :class="typing.mode === option.value ? 'bg-page text-accent shadow-sm' : 'hover:bg-faint'"
          :aria-pressed="typing.mode === option.value"
          @click="selectMode(option.value)"
        >
          <span class="font-bold">{{ option.icon }}</span><span>{{ option.label }}</span>
        </button>
      </div>

      <span class="mx-1.5 h-5 w-px shrink-0 bg-faint" aria-hidden="true" />

      <div class="flex shrink-0 items-center gap-0.5" role="group" aria-label="ប្រវែងលំហាត់">
        <button
          v-for="value in parameters"
          :key="value"
          class="focus-ring grid h-9 min-w-9 place-items-center rounded-lg px-2 transition hover:text-text"
          :class="typing.parameter === value ? 'bg-page text-accent shadow-sm' : 'hover:bg-faint'"
          :aria-pressed="typing.parameter === value"
          @click="typing.parameter = value"
        >
          {{ value }}
        </button>
      </div>

    </div>
  </div>
</template>
