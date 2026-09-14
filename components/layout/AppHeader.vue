<script setup lang="ts">
const route = useRoute()
const settings = useSettingsStore()

const primaryLinks = [
  { to: '/', label: 'ហាត់', icon: 'practice' },
  { to: '/learn', label: 'រៀន', icon: 'learn' },
  { to: '/stats', label: 'ស្ថិតិ', icon: 'stats' },
] as const

const utilityLinks = [
  { to: '/keyboard', label: 'ក្ដារចុច', icon: 'keyboard' },
  { to: '/settings', label: 'ការកំណត់', icon: 'settings' },
] as const

onMounted(() => settings.hydrate())
</script>

<template>
  <header class="flex h-20 items-center justify-between gap-3 sm:h-24">
    <NuxtLink to="/" class="focus-ring shrink-0 rounded-xl" aria-label="Krupyang home"><BrandLogo /></NuxtLink>

    <div class="flex min-w-0 items-center gap-2">
      <nav class="flex items-center gap-0.5 rounded-xl border border-faint bg-panel p-1" aria-label="Primary navigation">
        <NuxtLink
          v-for="link in primaryLinks"
          :key="link.to"
          :to="link.to"
          :title="link.label"
          class="focus-ring flex h-9 items-center gap-2 rounded-lg px-2.5 text-muted transition hover:bg-faint hover:text-text sm:px-3"
          :class="route.path === link.to ? 'bg-page text-accent shadow-sm' : ''"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          <svg v-if="link.icon === 'practice'" viewBox="0 0 24 24" class="h-4 w-4 fill-current"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v12h16V6H4Zm3 3h3v2H7V9Zm4 0h3v2h-3V9Zm4 0h2v2h-2V9Zm-8 4h10v2H7v-2Z"/></svg>
          <svg v-else-if="link.icon === 'learn'" viewBox="0 0 24 24" class="h-4 w-4 fill-current"><path d="M3 4h7a3 3 0 0 1 3 3v12a4 4 0 0 0-4-3H3V4Zm18 0h-7v12.5a5.8 5.8 0 0 1 3-1h4V4Z"/></svg>
          <svg v-else viewBox="0 0 24 24" class="h-4 w-4 fill-current"><path d="M4 19h16v2H2V3h2v16Zm3-2H5v-6h2v6Zm4 0H9V7h2v10Zm4 0h-2V9h2v8Zm4 0h-2V4h2v13Z"/></svg>
          <span class="hidden text-xs sm:block">{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <nav class="flex shrink-0 items-center gap-0.5 rounded-xl border border-faint bg-panel p-1" aria-label="Tools">
        <NuxtLink
          v-for="link in utilityLinks"
          :key="link.to"
          :to="link.to"
          :title="link.label"
          class="focus-ring grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-faint hover:text-text"
          :class="route.path === link.to ? 'bg-page text-accent shadow-sm' : ''"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          <svg v-if="link.icon === 'keyboard'" viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v10h18V7H3Zm2 2h2v2H5V9Zm3 0h2v2H8V9Zm3 0h2v2h-2V9Zm3 0h2v2h-2V9Zm3 0h2v2h-2V9ZM5 13h2v2H5v-2Zm3 0h8v2H8v-2Zm9 0h2v2h-2v-2Z"/></svg>
          <svg v-else viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current"><path d="m14.7 6.3 3-3 3 3-3 3-3-3ZM4 13a4 4 0 1 1 7.8 1H22v2H11.8A4 4 0 0 1 4 13Zm2 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm8 5a4 4 0 0 1 7.8 1H22v2h-.2a4 4 0 0 1-7.6 0H2v-2h12.2a4 4 0 0 1-.2-1Zm2 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM2 6h10v2H2V6Z"/></svg>
          <span class="sr-only">{{ link.label }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
