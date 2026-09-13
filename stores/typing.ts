import { defineStore } from 'pinia'
import type { TestMode } from '~/types/typing'

export const useTypingStore = defineStore('typing', {
  state: () => ({
    mode: 'syllables' as TestMode,
    parameter: 10,
    punctuation: false,
    numbers: false,
  }),
})
