import { defineStore } from 'pinia'
import type { TestResult } from '~/types/typing'

export const useStatsStore = defineStore('stats', {
  state: () => ({ results: [] as TestResult[] }),
  getters: {
    testsTaken: state => state.results.length,
    bestWpm: state => Math.max(0, ...state.results.map(result => result.wpm)),
    averageAccuracy: state => state.results.length
      ? Math.round(state.results.reduce((sum, result) => sum + result.accuracy, 0) / state.results.length)
      : 0,
  },
  actions: {
    hydrate() {
      if (!import.meta.client) return
      const saved = localStorage.getItem('krupyang:results')
      if (saved) this.results = JSON.parse(saved)
    },
    add(result: TestResult) {
      this.results.unshift(result)
      this.results = this.results.slice(0, 50)
      if (import.meta.client) localStorage.setItem('krupyang:results', JSON.stringify(this.results))
    },
  },
})
