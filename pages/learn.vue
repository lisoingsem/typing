<script setup lang="ts">
import lessons from '~/data/content/km/lessons.json'

const selected = ref(0)
const lesson = computed(() => lessons[selected.value]!)
</script>

<template>
  <div class="py-8 sm:py-12">
    <div class="mb-10 max-w-2xl">
      <p class="mb-2 text-sm text-accent">មេរៀន NIDA</p>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">រៀនតាមជំហាន</h1>
      <p class="mt-3 leading-7 text-muted">ចាប់ផ្ដើមពីជួរគោល បន្ទាប់មកហាត់បន្សំព្យញ្ជនៈ ជើងអក្សរ និងស្រៈខ្មែរ។</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-[310px_1fr]">
      <div class="space-y-2">
        <button v-for="(item, index) in lessons" :key="item.id" class="focus-ring flex w-full items-center gap-4 rounded-xl p-4 text-left transition" :class="selected === index ? 'bg-panel text-text' : 'text-muted hover:bg-panel/50 hover:text-text'" @click="selected = index">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full" :class="selected === index ? 'bg-accent text-page' : 'bg-faint'">{{ item.id }}</span>
          <span><strong class="block font-medium">{{ item.title }}</strong><small class="mt-1 block text-[11px] leading-5 text-muted">{{ item.description }}</small></span>
        </button>
      </div>

      <section class="rounded-2xl bg-panel p-6 sm:p-8">
        <div class="mb-8 flex items-start justify-between gap-4">
          <div><p class="text-xs text-muted">មេរៀន {{ lesson.id }} / {{ lessons.length }}</p><h2 class="mt-2 text-2xl text-accent">{{ lesson.title }}</h2></div>
          <span class="rounded-full bg-faint px-3 py-1 text-[10px] text-muted">០% រួចរាល់</span>
        </div>
        <p class="mb-8 rounded-xl bg-page p-6 text-center text-2xl leading-loose text-text">{{ lesson.text }}</p>
        <KhmerKeyboard :highlighted-codes="lesson.keys" />
        <NuxtLink to="/" class="focus-ring mx-auto mt-8 block w-fit rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-page transition hover:brightness-110">ចាប់ផ្ដើមហាត់</NuxtLink>
      </section>
    </div>
  </div>
</template>
