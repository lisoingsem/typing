<script setup lang="ts">
const route = useRoute()
const settings = useSettingsStore()

const links = [
  { to: '/', label: 'វាយអក្សរ', icon: 'keyboard' },
  { to: '/learn', label: 'រៀន', icon: 'crown' },
  { to: '/keyboard', label: 'ក្ដារចុច', icon: 'info' },
  { to: '/settings', label: 'ការកំណត់', icon: 'settings' },
]

onMounted(() => settings.hydrate())
</script>

<template>
  <header class="flex h-24 items-center justify-between sm:h-28">
    <div class="flex items-center gap-5">
      <NuxtLink to="/" class="focus-ring flex items-center gap-3 rounded-lg" aria-label="Krupyang home">
        <span class="grid h-9 w-12 place-items-center rounded-[10px] border-[3px] border-accent text-lg font-black text-accent">ក្ដ</span>
        <span class="hidden leading-none sm:block">
          <span class="block text-[10px] text-muted">រៀនវាយជាមួយ</span>
          <span class="block text-[26px] font-bold tracking-[-.06em] text-text">krupyang</span>
        </span>
      </NuxtLink>

      <nav class="flex items-center gap-1" aria-label="Primary navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :title="link.label"
          class="focus-ring grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-panel hover:text-text"
          :class="route.path === link.to ? 'text-accent' : ''"
        >
          <svg v-if="link.icon === 'keyboard'" viewBox="0 0 24 24" class="h-5 w-5 fill-current"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v10h18V7H3Zm2 2h2v2H5V9Zm3 0h2v2H8V9Zm3 0h2v2h-2V9Zm3 0h2v2h-2V9Zm3 0h2v2h-2V9ZM5 13h2v2H5v-2Zm3 0h8v2H8v-2Zm9 0h2v2h-2v-2Z"/></svg>
          <svg v-else-if="link.icon === 'crown'" viewBox="0 0 24 24" class="h-5 w-5 fill-current"><path d="m3 7 4 4 5-7 5 7 4-4-2 11H5L3 7Zm2 13h14v2H5v-2Z"/></svg>
          <svg v-else-if="link.icon === 'info'" viewBox="0 0 24 24" class="h-5 w-5 fill-current"><path d="M11 10h2v8h-2v-8Zm0-4h2v2h-2V6Zm1-4a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"/></svg>
          <svg v-else viewBox="0 0 24 24" class="h-5 w-5 fill-current"><path d="m14.7 6.3 3-3 3 3-3 3-3-3ZM4 13a4 4 0 1 1 7.8 1H22v2H11.8A4 4 0 0 1 4 13Zm2 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm8 5a4 4 0 0 1 7.8 1H22v2h-.2a4 4 0 0 1-7.6 0H2v-2h12.2a4 4 0 0 1-.2-1Zm2 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM2 6h10v2H2V6Z"/></svg>
          <span class="sr-only">{{ link.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <NuxtLink to="/stats" class="focus-ring grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-panel hover:text-text" title="ស្ថិតិ">
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current"><path d="M4 19h16v2H2V3h2v16Zm3-2H5v-6h2v6Zm4 0H9V7h2v10Zm4 0h-2V9h2v8Zm4 0h-2V4h2v13Z"/></svg>
      <span class="sr-only">ស្ថិតិ</span>
    </NuxtLink>
  </header>
</template>
