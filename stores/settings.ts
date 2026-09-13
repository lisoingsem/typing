import { defineStore } from 'pinia'
import type { ComparisonMode } from '~/types/typing'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    comparisonMode: 'normal' as ComparisonMode,
    showKeyboard: true,
    sound: false,
    theme: 'dark' as 'dark' | 'light',
  }),
  actions: {
    hydrate() {
      if (!import.meta.client) return
      const saved = localStorage.getItem('krupyang:settings')
      if (saved) Object.assign(this, JSON.parse(saved))
      document.documentElement.dataset.theme = this.theme
    },
    persist() {
      if (!import.meta.client) return
      localStorage.setItem('krupyang:settings', JSON.stringify(this.$state))
      document.documentElement.dataset.theme = this.theme
    },
  },
})
