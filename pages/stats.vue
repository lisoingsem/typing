<script setup lang="ts">
const stats = useStatsStore()
useSeoMeta({
  title: 'ស្ថិតិការហាត់វាយ',
  robots: 'noindex, nofollow',
})
onMounted(() => stats.hydrate())
</script>

<template>
  <div class="py-8 sm:py-12">
    <div class="mb-10">
      <p class="mb-2 text-sm text-accent">រក្សាទុកលើឧបករណ៍នេះ</p>
      <h1 class="text-3xl font-semibold sm:text-4xl">ស្ថិតិរបស់អ្នក</h1>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-xl bg-panel p-6"><p class="text-sm text-muted">ការសាកល្បង</p><p class="mt-2 text-4xl text-accent">{{ stats.testsTaken }}</p></div>
      <div class="rounded-xl bg-panel p-6"><p class="text-sm text-muted">ល្បឿនល្អបំផុត</p><p class="mt-2 text-4xl text-accent">{{ stats.bestWpm }} <small class="text-sm">wpm</small></p></div>
      <div class="rounded-xl bg-panel p-6"><p class="text-sm text-muted">ភាពត្រឹមត្រូវមធ្យម</p><p class="mt-2 text-4xl text-accent">{{ stats.averageAccuracy }}%</p></div>
    </div>

    <div class="mt-10 overflow-hidden rounded-xl border border-faint">
      <div class="grid grid-cols-[1fr_90px_90px] gap-4 bg-panel px-5 py-3 text-xs text-muted sm:grid-cols-[1fr_130px_110px_110px]"><span>កាលបរិច្ឆេទ</span><span>ប្រភេទ</span><span>WPM</span><span class="hidden sm:block">ត្រឹមត្រូវ</span></div>
      <div v-if="!stats.results.length" class="px-5 py-16 text-center text-muted">មិនទាន់មានលទ្ធផលទេ។ សាកល្បងវាយអក្សរមួយដងសិន។</div>
      <div v-for="result in stats.results" :key="result.id" class="grid grid-cols-[1fr_90px_90px] gap-4 border-t border-faint px-5 py-4 text-sm sm:grid-cols-[1fr_130px_110px_110px]">
        <span class="text-muted">{{ new Date(result.createdAt).toLocaleDateString('km-KH') }}</span><span>{{ result.mode }} {{ result.parameter }}</span><span class="text-accent">{{ result.wpm }}</span><span class="hidden sm:block">{{ result.accuracy }}%</span>
      </div>
    </div>
  </div>
</template>
