<script setup lang="ts">
const settings = useSettingsStore()
onMounted(() => settings.hydrate())
watch(() => settings.$state, () => settings.persist(), { deep: true })
</script>

<template>
  <div class="mx-auto w-full max-w-3xl py-8 sm:py-12">
    <div class="mb-10"><p class="mb-2 text-sm text-accent">បទពិសោធន៍ផ្ទាល់ខ្លួន</p><h1 class="text-3xl font-semibold sm:text-4xl">ការកំណត់</h1></div>
    <div class="space-y-4">
      <section class="flex flex-col justify-between gap-5 rounded-xl bg-panel p-6 sm:flex-row sm:items-center">
        <div class="max-w-xl"><h2 class="text-lg">ការប្រៀបធៀប Unicode</h2><p class="mt-2 text-sm leading-6 text-muted">Normal ទទួលយកលំដាប់កូដដែលមើលឃើញដូចគ្នា។ Strict តម្រូវឱ្យលំដាប់ Unicode ដូចគ្នាទាំងស្រុង។</p></div>
        <div class="flex shrink-0 rounded-lg bg-page p-1">
          <button class="focus-ring rounded-md px-4 py-2 text-sm" :class="settings.comparisonMode === 'normal' ? 'bg-accent text-page' : 'text-muted'" @click="settings.comparisonMode = 'normal'">Normal</button>
          <button class="focus-ring rounded-md px-4 py-2 text-sm" :class="settings.comparisonMode === 'strict' ? 'bg-accent text-page' : 'text-muted'" @click="settings.comparisonMode = 'strict'">Strict</button>
        </div>
      </section>
      <section class="flex items-center justify-between gap-5 rounded-xl bg-panel p-6"><div><h2 class="text-lg">បង្ហាញក្ដារចុច</h2><p class="mt-2 text-sm text-muted">បង្ហាញទីតាំង NIDA នៅក្រោមអត្ថបទហាត់។</p></div><button class="focus-ring relative h-7 w-12 rounded-full transition" :class="settings.showKeyboard ? 'bg-accent' : 'bg-faint'" role="switch" :aria-checked="settings.showKeyboard" @click="settings.showKeyboard = !settings.showKeyboard"><i class="absolute top-1 h-5 w-5 rounded-full bg-page transition-all" :class="settings.showKeyboard ? 'left-6' : 'left-1'" /></button></section>
      <section class="flex items-center justify-between gap-5 rounded-xl bg-panel p-6"><div><h2 class="text-lg">របៀបណែនាំ</h2><p class="mt-2 text-sm leading-6 text-muted">បង្ហាញគ្រាប់ចុច អក្សរបន្ទាប់ ម្រាមដៃ និងការណែនាំល្បឿនដូចកម្មវិធីហាត់វាយអក្សរ។</p></div><button class="focus-ring relative h-7 w-12 rounded-full transition" :class="settings.guidedMode ? 'bg-accent' : 'bg-faint'" role="switch" :aria-checked="settings.guidedMode" @click="settings.guidedMode = !settings.guidedMode"><i class="absolute top-1 h-5 w-5 rounded-full bg-page transition-all" :class="settings.guidedMode ? 'left-6' : 'left-1'" /></button></section>
      <section class="flex items-center justify-between gap-5 rounded-xl bg-panel p-6"><div><h2 class="text-lg">វាយត្រូវទើបបន្ត</h2><p class="mt-2 text-sm leading-6 text-muted">ពេលវាយខុស អក្សរមិនទៅមុខទេ ហើយគ្រាប់ចុចត្រឹមត្រូវនៅតែភ្លឺសម្រាប់សាកម្ដងទៀត។</p></div><button class="focus-ring relative h-7 w-12 rounded-full transition" :class="settings.correctOnly ? 'bg-accent' : 'bg-faint'" role="switch" :aria-checked="settings.correctOnly" @click="settings.correctOnly = !settings.correctOnly"><i class="absolute top-1 h-5 w-5 rounded-full bg-page transition-all" :class="settings.correctOnly ? 'left-6' : 'left-1'" /></button></section>
      <section class="flex items-center justify-between gap-5 rounded-xl bg-panel p-6"><div><h2 class="text-lg">ពណ៌ផ្ទៃ</h2><p class="mt-2 text-sm text-muted">ជ្រើសផ្ទៃងងឹត ឬផ្ទៃភ្លឺ។</p></div><button class="focus-ring rounded-lg bg-page px-4 py-2 text-sm text-accent" @click="settings.theme = settings.theme === 'dark' ? 'light' : 'dark'">{{ settings.theme === 'dark' ? '☾ ងងឹត' : '☀ ភ្លឺ' }}</button></section>
    </div>
  </div>
</template>
