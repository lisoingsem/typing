import { defineStore } from 'pinia'
import type { TestMode } from '~/types/typing'

export const useTypingStore = defineStore('typing', {
  state: () => ({
    mode: 'time' as TestMode,
    parameter: 30,
    punctuation: false,
    numbers: false,
  }),
})
