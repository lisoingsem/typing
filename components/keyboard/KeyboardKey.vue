<script setup lang="ts">
import type { KhmerKey } from '~/types/keyboard'

const props = defineProps<{
  keyData: KhmerKey
  activeCode?: string
  shift?: boolean
  highlighted?: boolean
  guided?: boolean
  guideSecondary?: boolean
  hasGuide?: boolean
}>()
const label = computed(() => props.shift ? (props.keyData.shift || props.keyData.normal) : props.keyData.normal)
</script>

<template>
  <div
    class="relative flex h-10 min-w-0 items-center justify-center rounded-md border border-transparent bg-panel text-muted shadow-[inset_0_-1px_0_var(--faint)] transition-all sm:h-11"
    :class="[
      activeCode === keyData.code && guided ? 'translate-y-px bg-accent !text-page shadow-none' : '',
      activeCode === keyData.code && hasGuide && !guided ? 'translate-y-px bg-danger !text-page shadow-none' : '',
      activeCode === keyData.code && !hasGuide ? 'translate-y-px bg-faint !text-text shadow-none' : '',
      highlighted ? 'border-accent text-accent' : '',
      guided ? 'guide-key z-10 border-accent bg-faint !text-accent shadow-none' : '',
      guideSecondary ? 'border-accent text-accent' : '',
    ]"
    :style="{ flex: keyData.width || 1 }"
    :title="`${keyData.code} · ${keyData.finger}`"
  >
    <span v-if="label" class="text-sm font-semibold sm:text-base">{{ label }}</span>
    <span v-else class="text-[8px] uppercase sm:text-[9px]">{{ keyData.latin }}</span>
    <span v-if="keyData.latin.length === 1" class="absolute left-1 top-0.5 text-[7px] uppercase opacity-60">{{ keyData.latin }}</span>
  </div>
</template>
