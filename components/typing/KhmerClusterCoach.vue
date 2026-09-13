<script setup lang="ts">
import { keystrokeSequence } from '~/lib/keyboard-guide'

const props = defineProps<{
  cluster: string
  typedCodepoints: number
}>()

const steps = computed(() => {
  let offset = 0
  return keystrokeSequence(props.cluster).map((keystroke, index, sequence) => {
    const length = Array.from(keystroke.value).length
    const start = offset
    offset += length
    const codepoint = keystroke.value.codePointAt(0) ?? 0
    const previous = sequence[index - 1]?.value
    let role = 'សញ្ញា'
    if (keystroke.value === ' ') role = 'ចន្លោះ'
    else if (codepoint === 0x17d2) role = 'សញ្ញាជើង'
    else if (codepoint >= 0x1780 && codepoint <= 0x17b3) role = previous === '្' ? 'ព្យញ្ជនៈរង' : 'ព្យញ្ជនៈមេ'
    else if (codepoint >= 0x17b6 && codepoint <= 0x17c5) role = 'ស្រៈ'
    return {
      ...keystroke,
      role,
      state: props.typedCodepoints >= offset ? 'done' : props.typedCodepoints >= start ? 'current' : 'next',
    }
  })
})

const displayCluster = computed(() => props.cluster === ' ' ? 'ចន្លោះ' : props.cluster || '✓')
</script>

<template>
  <section class="rounded-xl border border-faint bg-panel p-4" aria-label="Khmer syllable builder">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-[9px] uppercase tracking-[.18em] text-muted">សង់ព្យាង្គ</p>
        <p class="mt-1 text-3xl font-semibold text-text">{{ displayCluster }}</p>
      </div>
      <span class="rounded-full bg-page px-3 py-1 text-[9px] text-accent">KHMER LAB</span>
    </div>

    <div class="mt-4 flex flex-wrap items-start gap-1.5">
      <div v-for="(step, index) in steps" :key="`${step.code}-${index}`" class="flex items-center gap-1.5">
        <div class="min-w-12 rounded-lg border px-2 py-1.5 text-center transition-all" :class="{
          'border-accent bg-accent text-page': step.state === 'done',
          'border-accent bg-accent/10 text-accent': step.state === 'current',
          'border-faint bg-page text-muted': step.state === 'next',
        }">
          <span class="block text-lg leading-none">{{ step.value === ' ' ? '␣' : step.value }}</span>
          <span class="mt-1 block text-[8px] uppercase">{{ step.shift ? '⇧+' : '' }}{{ step.latin }}</span>
        </div>
        <span v-if="index < steps.length - 1" class="text-[9px] text-muted">›</span>
      </div>
    </div>

    <p v-if="steps.find(step => step.state === 'current')" class="mt-3 text-[10px] text-muted">
      ផ្នែកបច្ចុប្បន្ន៖ <span class="text-accent">{{ steps.find(step => step.state === 'current')?.role }}</span>
    </p>
  </section>
</template>
