<script setup lang="ts">
import { khmerNidaLayout } from '~/data/keyboards/khmer-nida'
import { shiftKeyFor } from '~/lib/keyboard-guide'
import type { GuidedKeystroke } from '~/types/keyboard'

const props = defineProps<{
  activeCode?: string
  highlightedCodes?: string[]
  guide?: GuidedKeystroke
}>()
const shift = ref(false)
const guidedShiftCode = computed(() => shiftKeyFor(props.guide))

function updateShift(event: KeyboardEvent) { shift.value = event.shiftKey }
onMounted(() => {
  window.addEventListener('keydown', updateShift)
  window.addEventListener('keyup', updateShift)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', updateShift)
  window.removeEventListener('keyup', updateShift)
})
</script>

<template>
  <div class="mx-auto w-full max-w-4xl select-none space-y-2" aria-label="Khmer NIDA keyboard">
    <div v-for="(row, rowIndex) in khmerNidaLayout" :key="rowIndex" class="flex gap-1.5">
      <KeyboardKey
        v-for="keyData in row"
        :key="keyData.code"
        :key-data="keyData"
        :active-code="activeCode"
        :shift="shift"
        :highlighted="highlightedCodes?.includes(keyData.code)"
        :guided="guide?.code === keyData.code"
        :guide-secondary="guidedShiftCode === keyData.code"
      />
    </div>
    <FingerGuide v-if="guide" :finger="guide.finger" class="pt-4" />
  </div>
</template>
