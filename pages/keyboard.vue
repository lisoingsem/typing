<script setup lang="ts">
import { khmerKeyByCode } from '~/data/keyboards/khmer-nida'
import { fingerLabels } from '~/lib/keyboard-guide'

const activeCode = ref('')
const keyName = computed(() => khmerKeyByCode.get(activeCode.value))

useSeoMeta({
  title: 'ផែនទីក្ដារចុចខ្មែរ NIDA',
  description: 'មើលទីតាំងអក្សរខ្មែរទាំងអស់លើក្ដារចុច NIDA សាកល្បងចុចគ្រាប់ចុច និងរៀនម្រាមដៃដែលត្រឹមត្រូវ។',
  ogTitle: 'ផែនទីក្ដារចុចខ្មែរ NIDA — Typing by Krupyang',
  ogDescription: 'ផែនទីក្ដារចុចខ្មែរ NIDA ដែលអាចសាកល្បងបាន និងបង្ហាញម្រាមដៃសម្រាប់គ្រាប់ចុចនីមួយៗ។',
})

function down(event: KeyboardEvent) { activeCode.value = event.code }
function up(event: KeyboardEvent) { if (activeCode.value === event.code) activeCode.value = '' }
onMounted(() => { window.addEventListener('keydown', down); window.addEventListener('keyup', up) })
onBeforeUnmount(() => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) })
</script>

<template>
  <div class="flex flex-1 flex-col justify-center py-8">
    <header class="mx-auto mb-7 flex w-full max-w-5xl flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div class="max-w-xl">
        <p class="mb-1 text-[10px] uppercase tracking-[.18em] text-accent">Khmer NIDA</p>
        <h1 class="text-2xl font-semibold sm:text-3xl">ផែនទីក្ដារចុច</h1>
        <p class="mt-2 text-sm leading-6 text-muted">ចុចគ្រាប់ចុចពិត ដើម្បីមើលអក្សរខ្មែរ និងម្រាមដៃដែលគួរប្រើ។</p>
      </div>

      <div class="flex min-h-14 min-w-48 items-center justify-end gap-3 rounded-xl bg-panel px-4 py-2 text-right">
        <template v-if="keyName">
          <span class="text-2xl font-semibold text-accent">{{ keyName.normal || keyName.latin }}</span>
          <span>
            <b class="block text-xs font-normal text-text">{{ keyName.latin }}</b>
            <small class="text-[9px] text-muted">{{ fingerLabels[keyName.finger] }}</small>
          </span>
        </template>
        <span v-else class="text-[10px] text-muted">ចុចគ្រាប់ចុចណាមួយ</span>
      </div>
    </header>

    <KhmerKeyboard :active-code="activeCode" />
    <p class="mx-auto mt-5 text-center text-[10px] text-muted">សង្កត់ Shift ដើម្បីមើលស្រទាប់អក្សរទីពីរ</p>
  </div>
</template>
