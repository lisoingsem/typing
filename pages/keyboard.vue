<script setup lang="ts">
import { khmerKeyByCode } from '~/data/keyboards/khmer-nida'

const activeCode = ref('')
const keyName = computed(() => khmerKeyByCode.get(activeCode.value))

function down(event: KeyboardEvent) { activeCode.value = event.code }
function up(event: KeyboardEvent) { if (activeCode.value === event.code) activeCode.value = '' }
onMounted(() => { window.addEventListener('keydown', down); window.addEventListener('keyup', up) })
onBeforeUnmount(() => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) })
</script>

<template>
  <div class="flex flex-1 flex-col justify-center py-10">
    <div class="mx-auto mb-12 max-w-2xl text-center">
      <p class="mb-2 text-sm text-accent">Khmer NIDA</p>
      <h1 class="text-3xl font-semibold sm:text-4xl">ស្គាល់ក្ដារចុចរបស់អ្នក</h1>
      <p class="mt-4 leading-7 text-muted">ចុចគ្រាប់ចុចណាមួយលើក្ដារចុចពិត ដើម្បីមើលទីតាំង អក្សរខ្មែរ និងម្រាមដៃដែលគួរប្រើ។</p>
      <div class="mt-5 h-8 text-sm text-accent">
        <span v-if="keyName">{{ keyName.code }} → {{ keyName.normal || keyName.latin }} · {{ keyName.finger }}</span>
      </div>
    </div>
    <KhmerKeyboard :active-code="activeCode" />
    <div class="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-3 text-xs text-muted sm:grid-cols-4">
      <span><i class="mr-2 inline-block h-2 w-2 rounded-full bg-[#d08b66]" />កូនដៃឆ្វេង</span>
      <span><i class="mr-2 inline-block h-2 w-2 rounded-full bg-[#9b87c9]" />ចង្អុលឆ្វេង</span>
      <span><i class="mr-2 inline-block h-2 w-2 rounded-full bg-[#6ba99d]" />ចង្អុលស្ដាំ</span>
      <span><i class="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />កូនដៃស្ដាំ</span>
    </div>
  </div>
</template>
