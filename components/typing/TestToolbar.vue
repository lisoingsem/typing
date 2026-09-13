<script setup lang="ts">
const typing = useTypingStore()
const modeOptions = [
  { value: 'syllables', label: 'ព្យាង្គ', icon: 'ក្' },
  { value: 'time', label: 'ពេល', icon: '◷' },
  { value: 'words', label: 'ពាក្យ', icon: 'A' },
  { value: 'quote', label: 'ឃ្លា', icon: '❝' },
] as const
const parameters = computed(() => {
  if (typing.mode === 'syllables') return [5, 10, 20, 30]
  if (typing.mode === 'words') return [10, 25, 50, 100]
  return [15, 30, 60, 120]
})

function selectMode(mode: 'syllables' | 'time' | 'words' | 'quote') {
  typing.mode = mode
  if (mode === 'syllables' && ![5, 10, 20, 30].includes(typing.parameter)) typing.parameter = 10
  if (mode === 'words' && ![10, 25, 50, 100].includes(typing.parameter)) typing.parameter = 25
  if (mode === 'time' && ![15, 30, 60, 120].includes(typing.parameter)) typing.parameter = 30
}
</script>

<template>
  <div class="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-panel p-2 text-xs text-muted shadow-[0_10px_30px_rgba(0,0,0,.06)] sm:text-sm">
    <div class="flex items-center gap-1 border-r border-faint pr-2">
      <button class="focus-ring rounded-md px-3 py-2 transition hover:text-text" :class="typing.punctuation ? 'text-accent' : ''" @click="typing.punctuation = !typing.punctuation">@ សញ្ញា</button>
      <button class="focus-ring rounded-md px-3 py-2 transition hover:text-text" :class="typing.numbers ? 'text-accent' : ''" @click="typing.numbers = !typing.numbers"># លេខ</button>
    </div>
    <div class="flex items-center gap-1 border-r border-faint pr-2">
      <button v-for="option in modeOptions" :key="option.value" class="focus-ring rounded-md px-3 py-2 transition hover:text-text" :class="typing.mode === option.value ? 'text-accent' : ''" @click="selectMode(option.value)">
        <span class="mr-1 font-bold">{{ option.icon }}</span>{{ option.label }}
      </button>
    </div>
    <div v-if="typing.mode !== 'quote'" class="flex items-center gap-1">
      <button v-for="value in parameters" :key="value" class="focus-ring rounded-md px-2 py-2 transition hover:text-text" :class="typing.parameter === value ? 'text-accent' : ''" @click="typing.parameter = value">{{ value }}</button>
    </div>
  </div>
</template>
