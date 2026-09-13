<script setup lang="ts">
import { fingerLabels } from '~/lib/keyboard-guide'
import type { GuidedKeystroke } from '~/types/keyboard'

const props = defineProps<{
  keystroke?: GuidedKeystroke
  wpm: number
  accuracy: number
  started: boolean
  feedback: 'idle' | 'correct' | 'incorrect'
}>()

const displayCharacter = computed(() => props.keystroke?.value === ' ' ? 'space' : props.keystroke?.value || '✓')
const keyLabel = computed(() => props.keystroke?.latin === 'space' ? 'SPACE' : props.keystroke?.latin || '—')
const coach = computed(() => {
  if (!props.started) return 'មើលអក្សរ រកគ្រាប់ចុច ហើយប្រើម្រាមដែលបង្ហាញ'
  if (props.accuracy < 90) return 'បន្ថយល្បឿនបន្តិច—ភាពត្រឹមត្រូវមកមុនល្បឿន'
  if (props.wpm < 20) return 'រក្សាចង្វាក់ថេរ និងកុំមើលដៃញឹកញាប់'
  if (props.wpm < 40) return 'ល្អណាស់! ចុចស្រាលៗ និងរក្សាម្រាមលើជួរគោល'
  return 'ចង្វាក់ល្អ! សម្លឹងអត្ថបទ ហើយទុកឱ្យម្រាមដៃចងចាំទីតាំង'
})
</script>

<template>
  <section class="guide-panel mx-auto mb-5 grid w-full max-w-4xl items-center gap-4 rounded-xl border border-accent/20 bg-panel px-4 py-3 sm:grid-cols-[100px_170px_1fr] sm:px-5" aria-label="Typing guide">
    <div class="flex items-center gap-3 sm:block">
      <p class="text-[10px] uppercase tracking-[.16em] text-muted">អក្សរបន្ទាប់</p>
      <p class="mt-1 truncate text-3xl font-semibold text-accent">{{ displayCharacter }}</p>
    </div>

    <div class="flex items-center gap-2">
      <span v-if="keystroke?.shift" class="rounded-md border border-faint bg-page px-2 py-2 text-[10px] text-muted">SHIFT</span>
      <span v-if="keystroke?.shift" class="text-muted">+</span>
      <span class="min-w-12 rounded-md border border-accent/60 bg-page px-3 py-2 text-center text-sm font-semibold text-accent shadow-[0_2px_0_var(--accent)]">{{ keyLabel }}</span>
      <span v-if="keystroke" class="ml-2 hidden text-[11px] text-muted lg:inline">{{ fingerLabels[keystroke.finger] }}</span>
      <span v-if="feedback === 'correct'" class="ml-auto text-xs text-accent">ត្រឹមត្រូវ ✓</span>
      <span v-else-if="feedback === 'incorrect'" class="ml-auto text-xs font-semibold text-danger">ខុស — សាកម្ដងទៀត</span>
    </div>

    <div class="flex items-center justify-between gap-4 border-t border-faint pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
      <p class="max-w-md text-[11px] leading-5 text-muted">{{ coach }}</p>
      <div class="flex shrink-0 gap-3 text-right text-[10px] text-muted">
        <span><b class="block text-base font-normal text-text">{{ wpm }}</b>wpm</span>
        <span><b class="block text-base font-normal" :class="accuracy < 90 ? 'text-danger' : 'text-accent'">{{ accuracy }}%</b>acc</span>
      </div>
    </div>
  </section>
</template>
