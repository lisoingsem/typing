import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        panel: 'var(--panel)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        mono: ['"SFMono-Regular"', '"Noto Sans Khmer"', '"Khmer OS Siemreap"', 'ui-monospace', 'monospace'],
        sans: ['Inter', '"Noto Sans Khmer"', 'system-ui', 'sans-serif'],
      },
    },
  },
}
