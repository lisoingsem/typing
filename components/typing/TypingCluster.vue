<script setup lang="ts">
import type { ClusterResult } from '~/types/typing'

defineProps<{ cluster: ClusterResult; caret?: boolean }>()
</script>

<template>
  <span class="relative transition-colors duration-100" :class="{
    'text-text': cluster.state === 'correct',
    'text-danger': cluster.state === 'incorrect',
    'text-accent': cluster.state === 'pending',
    'text-muted': cluster.state === 'untouched',
  }">
    <i v-if="caret" class="typing-caret absolute -left-[3px] top-[.1em] h-[1.25em] w-[3px] rounded-full bg-accent" />
    <span :class="cluster.state === 'incorrect' ? 'underline decoration-danger/60 decoration-2 underline-offset-4' : ''">{{ cluster.expected || cluster.typed }}</span>
  </span>
</template>
