<script setup lang="ts">
import { fingerLabels } from '~/lib/keyboard-guide'
import type { Finger } from '~/types/keyboard'

const props = defineProps<{ finger?: Finger }>()

const leftFingers: Finger[] = ['left-pinky', 'left-ring', 'left-middle', 'left-index', 'left-thumb']
const rightFingers: Finger[] = ['right-thumb', 'right-index', 'right-middle', 'right-ring', 'right-pinky']
const shortName: Record<Finger, string> = {
  'left-pinky': 'ក', 'left-ring': 'ន', 'left-middle': 'ក', 'left-index': 'ច', 'left-thumb': 'ម',
  'right-thumb': 'ម', 'right-index': 'ច', 'right-middle': 'ក', 'right-ring': 'ន', 'right-pinky': 'ក',
}

const label = computed(() => props.finger ? fingerLabels[props.finger] : 'ដាក់ម្រាមដៃលើជួរគោល')
</script>

<template>
  <div class="flex min-w-[190px] items-center justify-center gap-4" aria-live="polite">
    <div class="flex items-end gap-1" aria-label="ដៃឆ្វេង">
      <span
        v-for="(item, index) in leftFingers"
        :key="item"
        class="grid w-5 place-items-center rounded-full border text-[8px] transition-all duration-200"
        :class="[
          item === finger ? 'finger-target -translate-y-1 border-accent bg-accent text-page' : 'border-faint bg-page text-muted',
          index === 4 ? 'h-7 rotate-[35deg]' : index === 0 ? 'h-8' : index === 1 ? 'h-10' : 'h-11',
        ]"
      >{{ shortName[item] }}</span>
    </div>
    <div class="h-8 w-px bg-faint" />
    <div class="flex items-end gap-1" aria-label="ដៃស្ដាំ">
      <span
        v-for="(item, index) in rightFingers"
        :key="item"
        class="grid w-5 place-items-center rounded-full border text-[8px] transition-all duration-200"
        :class="[
          item === finger ? 'finger-target -translate-y-1 border-accent bg-accent text-page' : 'border-faint bg-page text-muted',
          index === 0 ? 'h-7 -rotate-[35deg]' : index === 4 ? 'h-8' : index === 3 ? 'h-10' : 'h-11',
        ]"
      >{{ shortName[item] }}</span>
    </div>
    <span class="hidden min-w-28 text-xs text-accent sm:block">{{ label }}</span>
  </div>
</template>
