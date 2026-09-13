import { describe, expect, it } from 'vitest'
import { nextKeystroke, shiftKeyFor } from '../lib/keyboard-guide'

describe('NIDA keyboard guide', () => {
  it('maps a Khmer letter to its physical key', () => {
    expect(nextKeystroke('កម្ពុជា', '')).toMatchObject({ code: 'KeyK', latin: 'K', shift: false })
  })

  it('advances after typed Unicode code points', () => {
    expect(nextKeystroke('កម', 'ក')).toMatchObject({ code: 'KeyM', latin: 'M' })
  })

  it('uses the opposite hand for shift', () => {
    const stroke = nextKeystroke('គ', '')
    expect(stroke).toMatchObject({ code: 'KeyK', shift: true })
    expect(shiftKeyFor(stroke)).toBe('ShiftLeft')
  })

  it('guides spaces with the thumb', () => {
    expect(nextKeystroke(' ក', '')).toMatchObject({ code: 'Space', finger: 'right-thumb' })
  })
})
