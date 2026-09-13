<script setup lang="ts">
import type { KhmerKey } from '~/types/keyboard'

const props = defineProps<{ keyData: KhmerKey; activeCode?: string; shift?: boolean; highlighted?: boolean }>()
const label = computed(() => props.shift ? (props.keyData.shift || props.keyData.normal) : props.keyData.normal)
</script>

<template>
  <div
    class="relative flex h-11 min-w-0 items-center justify-center rounded-md border border-faint bg-panel text-muted shadow-[0_3px_0_var(--faint)] transition-all sm:h-12"
    :class="[
      activeCode === keyData.code ? 'translate-y-[2px] border-accent bg-accent !text-page shadow-[0_1px_0_var(--accent)]' : '',
      highlighted ? 'border-accent/70 text-accent' : '',
    ]"
    :style="{ flex: keyData.width || 1 }"
    :title="`${keyData.code} · ${keyData.finger}`"
  >
    <span v-if="label" class="text-base font-semibold sm:text-lg">{{ label }}</span>
    <span v-else class="text-[8px] uppercase sm:text-[9px]">{{ keyData.latin }}</span>
    <span v-if="keyData.latin.length === 1" class="absolute left-1 top-0.5 text-[7px] uppercase opacity-60">{{ keyData.latin }}</span>
  </div>
</template>
