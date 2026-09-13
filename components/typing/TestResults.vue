<script setup lang="ts">
import type { TestResult } from '~/types/typing'

const props = defineProps<{ result: TestResult }>()
defineEmits<{ restart: [] }>()

const width = 900
const height = 220
const maxWpm = computed(() => Math.max(20, ...props.result.samples) * 1.15)
const points = computed(() => props.result.samples.map((value, index) => {
  const x = props.result.samples.length <= 1 ? 0 : index / (props.result.samples.length - 1) * width
  const y = height - value / maxWpm.value * height
  return `${x},${y}`
}).join(' '))
</script>

<template>
  <section class="result-rise py-8 sm:py-12">
    <div class="grid gap-8 lg:grid-cols-[150px_1fr]">
      <div class="space-y-5">
        <div><p class="text-2xl text-muted">wpm</p><p class="text-6xl leading-none text-accent">{{ result.wpm }}</p></div>
        <div><p class="text-2xl text-muted">acc</p><p class="text-5xl leading-none text-accent">{{ result.accuracy }}%</p></div>
      </div>
      <div class="min-w-0">
        <div class="mb-2 flex justify-between text-xs text-muted"><span>ពាក្យក្នុងមួយនាទី</span><span>{{ result.duration }}s</span></div>
        <svg viewBox="0 0 900 220" class="h-auto w-full overflow-visible" role="img" aria-label="WPM over time">
          <line v-for="y in [0, 55, 110, 165, 220]" :key="y" x1="0" :y1="y" x2="900" :y2="y" stroke="var(--faint)" stroke-width="1" />
          <polyline :points="points" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <circle v-for="(point, index) in points.split(' ')" :key="index" :cx="point.split(',')[0]" :cy="point.split(',')[1]" r="4" fill="var(--accent)" />
        </svg>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-6 border-t border-faint pt-7 sm:grid-cols-5">
      <div><p class="text-muted">ប្រភេទ</p><p class="mt-1 text-lg text-accent">{{ result.mode }} {{ result.parameter }}</p></div>
      <div><p class="text-muted">raw</p><p class="mt-1 text-2xl text-accent">{{ result.rawWpm }}</p></div>
      <div><p class="text-muted">អក្សរ</p><p class="mt-1 text-xl text-accent">{{ result.correct }}/{{ result.incorrect }}</p></div>
      <div><p class="text-muted">ភាពថេរ</p><p class="mt-1 text-2xl text-accent">{{ result.consistency }}%</p></div>
      <div><p class="text-muted">ពេល</p><p class="mt-1 text-2xl text-accent">{{ result.duration }}s</p></div>
    </div>

    <div class="mt-9 flex justify-center">
      <button class="focus-ring rounded-lg px-6 py-3 text-muted transition hover:bg-panel hover:text-accent" @click="$emit('restart')">↻ សាកល្បងម្ដងទៀត</button>
    </div>
  </section>
</template>
