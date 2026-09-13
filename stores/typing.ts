import { defineStore } from 'pinia'
import type { TestMode } from '~/types/typing'

export const useTypingStore = defineStore('typing', {
  state: () => ({
    mode: 'words' as TestMode,
    parameter: 25,
    punctuation: false,
    numbers: false,
  }),
})
