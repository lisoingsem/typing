<script setup lang="ts">
import type { ClusterResult } from '~/types/typing'

const props = defineProps<{
  modelValue: string
  clusters: ClusterResult[]
  focused: boolean
  finished: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: []
  blur: []
  compositionstart: []
  compositionend: []
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const input = ref<HTMLTextAreaElement>()
const typedIndex = computed(() => props.clusters.findIndex(cluster => cluster.state === 'untouched'))
const caretIndex = computed(() => typedIndex.value < 0 ? props.clusters.length : typedIndex.value)

function focus() { input.value?.focus({ preventScroll: true }) }
function onInput(event: Event) { emit('update:modelValue', (event.target as HTMLTextAreaElement).value) }

onMounted(() => setTimeout(focus, 80))
defineExpose({ focus })
</script>

<template>
  <section class="relative cursor-text py-12 sm:py-16" aria-label="Typing test" @click="focus">
    <textarea
      ref="input"
      :value="modelValue"
      class="absolute inset-0 h-full w-full resize-none opacity-0 caret-transparent"
      :disabled="finished"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      aria-label="Type the Khmer text shown"
      @input="onInput"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @compositionstart="emit('compositionstart')"
      @compositionend="emit('compositionend')"
      @keydown="emit('keydown', $event)"
      @keyup="emit('keyup', $event)"
    />

    <div class="pointer-events-none relative max-h-[9.2rem] overflow-hidden text-left font-mono text-[1.65rem] font-medium leading-[1.85] tracking-wide sm:text-[2.15rem] sm:leading-[1.9] lg:text-[2.35rem]" :class="!focused && modelValue === '' ? 'blur-[1.5px]' : ''">
      <TypingCluster
        v-for="(cluster, index) in clusters"
        :key="`${index}-${cluster.expected}`"
        :cluster="cluster"
        :caret="focused && !finished && index === caretIndex"
      />
      <i v-if="focused && !finished && caretIndex === clusters.length" class="typing-caret inline-block h-[1.25em] w-[3px] rounded-full bg-accent align-middle" />
    </div>

    <Transition name="fade">
      <div v-if="!focused && !finished" class="pointer-events-none absolute inset-0 grid place-items-center">
        <button class="rounded-lg bg-page/90 px-5 py-3 text-sm text-text shadow-xl">ចុចដើម្បីចាប់ផ្ដើម</button>
      </div>
    </Transition>
  </section>
</template>
