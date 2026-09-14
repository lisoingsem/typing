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
const fingerLabel = computed(() => props.keystroke ? fingerLabels[props.keystroke.finger] : '')
const statusText = computed(() => {
  if (props.feedback === 'incorrect') return 'ខុស — សាកម្ដងទៀត'
  if (props.feedback === 'correct') return 'ត្រឹមត្រូវ ✓'
  if (!props.started) return 'រកគ្រាប់ចុច ហើយប្រើម្រាមដែលបង្ហាញ'
  if (props.accuracy < 90) return 'បន្ថយល្បឿនបន្តិច'
  return 'រក្សាចង្វាក់ថេរ'
})
</script>

<template>
  <section class="flex w-full flex-wrap items-center gap-3 rounded-xl bg-panel px-3 py-2.5 sm:flex-nowrap sm:px-4" aria-label="Typing guide">
    <div class="flex min-w-24 items-center gap-3">
      <p class="text-[10px] text-muted">បន្ទាប់</p>
      <p class="truncate text-2xl font-semibold text-accent">{{ displayCharacter }}</p>
    </div>

    <div class="hidden h-7 w-px bg-faint sm:block" />

    <div class="flex items-center gap-2">
      <span v-if="keystroke?.shift" class="rounded-md bg-page px-2 py-1.5 text-[9px] text-muted">SHIFT</span>
      <span v-if="keystroke?.shift" class="text-muted">+</span>
      <span class="min-w-11 rounded-md bg-accent px-3 py-1.5 text-center text-xs font-semibold text-page">{{ keyLabel }}</span>
      <span v-if="keystroke" class="hidden text-[10px] text-muted md:inline">{{ fingerLabel }}</span>
    </div>

    <p class="ml-auto hidden max-w-60 truncate text-[10px] lg:block" :class="feedback === 'incorrect' ? 'text-danger' : 'text-muted'">{{ statusText }}</p>

    <div class="ml-auto flex shrink-0 items-center gap-3 border-l border-faint pl-3 text-[9px] text-muted lg:ml-0">
      <span><b class="mr-1 text-sm font-normal text-text">{{ wpm }}</b>wpm</span>
      <span><b class="mr-1 text-sm font-normal" :class="accuracy < 90 ? 'text-danger' : 'text-accent'">{{ accuracy }}%</b>acc</span>
    </div>
  </section>
</template>
