<script setup lang="ts">
const typing = useTypingStore()
const toolbar = ref<HTMLElement>()
const openMenu = ref<'mode' | 'parameter' | null>(null)
const modeOptions = [
  { value: 'words', label: 'ពាក្យ' },
  { value: 'time', label: 'ពេល' },
  { value: 'syllables', label: 'មូលដ្ឋាន' },
] as const
const parameters = computed(() => {
  if (typing.mode === 'syllables') return [5, 10, 20, 30]
  if (typing.mode === 'words') return [10, 25, 50, 100]
  return [15, 30, 60, 120]
})
const modeLabel = computed(() => modeOptions.find(option => option.value === typing.mode)?.label ?? 'ពាក្យ')
const parameterLabel = computed(() => typing.mode === 'time' ? 'វិ.' : typing.mode === 'syllables' ? 'ក្រុម' : '')

function selectMode(mode: 'syllables' | 'time' | 'words') {
  typing.mode = mode
  if (mode === 'syllables' && ![5, 10, 20, 30].includes(typing.parameter)) typing.parameter = 10
  if (mode === 'words' && ![10, 25, 50, 100].includes(typing.parameter)) typing.parameter = 25
  if (mode === 'time' && ![15, 30, 60, 120].includes(typing.parameter)) typing.parameter = 30
  openMenu.value = null
}

function selectParameter(value: number) {
  typing.parameter = value
  openMenu.value = null
}

function toggleMenu(menu: 'mode' | 'parameter') {
  openMenu.value = openMenu.value === menu ? null : menu
}

function closeOnOutside(event: PointerEvent) {
  if (!toolbar.value?.contains(event.target as Node)) openMenu.value = null
}

onMounted(() => document.addEventListener('pointerdown', closeOnOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOnOutside))
</script>

<template>
  <div ref="toolbar" class="relative flex h-9 shrink-0 items-center rounded-xl bg-panel p-1 text-xs shadow-[0_8px_24px_rgba(0,0,0,.07)]">
    <div class="relative">
      <button
        type="button"
        class="focus-ring flex h-7 items-center gap-2 rounded-lg px-2.5 text-accent transition hover:bg-faint"
        :aria-label="`របៀបហាត់៖ ${modeLabel}`"
        aria-haspopup="listbox"
        :aria-expanded="openMenu === 'mode'"
        @click="toggleMenu('mode')"
      >
        <span>{{ modeLabel }}</span>
        <svg viewBox="0 0 12 8" class="h-2 w-2.5 fill-current text-muted transition" :class="openMenu === 'mode' ? 'rotate-180' : ''" aria-hidden="true"><path d="M1.2 1.4 6 6.2l4.8-4.8L12 2.6l-6 6-6-6 1.2-1.2Z"/></svg>
      </button>

      <div v-if="openMenu === 'mode'" class="absolute left-0 top-full z-30 mt-2 min-w-32 rounded-xl border border-faint bg-panel p-1 shadow-2xl" role="listbox" aria-label="ជ្រើសរបៀបហាត់">
        <button
          v-for="option in modeOptions"
          :key="option.value"
          type="button"
          role="option"
          :aria-selected="typing.mode === option.value"
          class="focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-muted transition hover:bg-faint hover:text-text"
          :class="typing.mode === option.value ? 'bg-page text-accent' : ''"
          @click="selectMode(option.value)"
        >
          {{ option.label }}<span v-if="typing.mode === option.value" aria-hidden="true">✓</span>
        </button>
      </div>
    </div>

    <span class="h-4 w-px bg-faint" aria-hidden="true" />

    <div class="relative">
      <button
        type="button"
        class="focus-ring flex h-7 items-center gap-2 rounded-lg px-2.5 text-text transition hover:bg-faint"
        :aria-label="`ប្រវែង៖ ${typing.parameter}${parameterLabel ? ` ${parameterLabel}` : ''}`"
        aria-haspopup="listbox"
        :aria-expanded="openMenu === 'parameter'"
        @click="toggleMenu('parameter')"
      >
        <span>{{ typing.parameter }}</span>
        <svg viewBox="0 0 12 8" class="h-2 w-2.5 fill-current text-muted transition" :class="openMenu === 'parameter' ? 'rotate-180' : ''" aria-hidden="true"><path d="M1.2 1.4 6 6.2l4.8-4.8L12 2.6l-6 6-6-6 1.2-1.2Z"/></svg>
      </button>

      <div v-if="openMenu === 'parameter'" class="absolute left-0 top-full z-30 mt-2 min-w-20 rounded-xl border border-faint bg-panel p-1 shadow-2xl" role="listbox" aria-label="ជ្រើសប្រវែងលំហាត់">
        <button
          v-for="value in parameters"
          :key="value"
          type="button"
          role="option"
          :aria-selected="typing.parameter === value"
          class="focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-muted transition hover:bg-faint hover:text-text"
          :class="typing.parameter === value ? 'bg-page text-accent' : ''"
          @click="selectParameter(value)"
        >
          {{ value }}<span v-if="typing.parameter === value" aria-hidden="true">✓</span>
        </button>
      </div>
    </div>

    <span v-if="parameterLabel" class="hidden pr-2 text-[9px] text-muted sm:inline">{{ parameterLabel }}</span>
  </div>
</template>
