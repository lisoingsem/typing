<script setup lang="ts">
const engine = useTypingEngine()
const typing = useTypingStore()
const settings = useSettingsStore()
const stats = useStatsStore()
const typingText = ref<{ focus: () => void }>()

const latestResult = computed(() => engine.finished.value ? stats.results[0] : undefined)

function restart() {
  engine.restart(true)
  nextTick(() => typingText.value?.focus())
}

function onKeydown(event: KeyboardEvent) {
  engine.keyDown(event)
  if (event.key === 'Tab' && !event.shiftKey) {
    event.preventDefault()
    restart()
  }
  if (event.key === 'Escape') (event.target as HTMLElement).blur()
}

onMounted(() => {
  stats.hydrate()
  engine.restart(true)
})
</script>

<template>
  <div class="flex flex-1 flex-col">
    <TestToolbar v-if="!engine.finished.value" />

    <div v-if="!engine.finished.value" class="flex flex-1 flex-col justify-center py-6">
      <div class="mb-2 flex h-9 items-center justify-between text-accent">
        <span class="text-2xl">{{ typing.mode === 'time' ? engine.remaining.value : `${Math.round(engine.progress.value * 100)}%` }}</span>
        <span class="text-sm text-muted">{{ settings.comparisonMode === 'normal' ? 'សម្រួល Unicode' : 'Unicode ដាច់ខាត' }}</span>
      </div>

      <div class="h-1 overflow-hidden rounded-full bg-panel">
        <div class="h-full bg-accent transition-[width] duration-100" :style="{ width: `${Math.min(100, engine.progress.value * 100)}%` }" />
      </div>

      <TypingText
        ref="typingText"
        :model-value="engine.rawInput.value"
        :clusters="engine.clusters.value"
        :focused="engine.focused.value"
        :finished="engine.finished.value"
        @update:model-value="engine.setInput"
        @focus="engine.focused.value = true"
        @blur="engine.focused.value = false"
        @compositionstart="engine.composing.value = true"
        @compositionend="engine.composing.value = false"
        @keydown="onKeydown"
        @keyup="engine.keyUp"
      />

      <div class="mb-8 flex items-center justify-center gap-6 text-xs text-muted">
        <span><kbd class="rounded bg-muted px-2 py-1 text-page">tab</kbd> + <kbd class="rounded bg-muted px-2 py-1 text-page">enter</kbd> ចាប់ផ្ដើមថ្មី</span>
        <span class="hidden sm:inline"><kbd class="rounded bg-muted px-2 py-1 text-page">esc</kbd> ផ្អាក</span>
      </div>

      <KhmerKeyboard v-if="settings.showKeyboard" :active-code="engine.activeCode.value" />
    </div>

    <TestResults v-else-if="latestResult" :result="latestResult" @restart="restart" />
  </div>
</template>
