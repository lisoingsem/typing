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
const currentRole = computed(() => steps.value.find(step => step.state === 'current')?.role)
</script>

<template>
  <section class="flex min-h-11 w-full items-center gap-3 overflow-x-auto border-t border-faint px-3 py-2 sm:px-4" aria-label="Khmer keystroke sequence">
    <div class="flex shrink-0 items-baseline gap-2">
      <p class="text-[9px] text-muted">លំដាប់</p>
      <p class="text-xl font-semibold text-text">{{ displayCluster }}</p>
    </div>

    <div class="h-5 w-px shrink-0 bg-faint" />

    <div class="flex shrink-0 items-center gap-1">
      <div v-for="(step, index) in steps" :key="`${step.code}-${index}`" class="flex items-center gap-1.5">
        <div class="min-w-9 rounded-md px-2 py-1 text-center transition-all" :class="{
          'bg-faint text-muted': step.state === 'done',
          'bg-accent text-page': step.state === 'current',
          'bg-page text-muted': step.state === 'next',
        }">
          <span class="text-sm">{{ step.value === ' ' ? '␣' : step.value }}</span>
          <span class="ml-1 text-[7px] uppercase opacity-70">{{ step.shift ? '⇧+' : '' }}{{ step.latin }}</span>
        </div>
        <span v-if="index < steps.length - 1" class="text-[8px] text-muted">›</span>
      </div>
    </div>

    <p v-if="currentRole" class="hidden shrink-0 rounded-full bg-page px-2.5 py-1 text-[9px] text-muted md:block">{{ currentRole }}</p>
  </section>
</template>
