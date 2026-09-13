<script setup lang="ts">
import { khmerNidaLayout } from '~/data/keyboards/khmer-nida'

defineProps<{ activeCode?: string; highlightedCodes?: string[] }>()
const shift = ref(false)

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
      <KeyboardKey v-for="keyData in row" :key="keyData.code" :key-data="keyData" :active-code="activeCode" :shift="shift" :highlighted="highlightedCodes?.includes(keyData.code)" />
    </div>
  </div>
</template>
