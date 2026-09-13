import { describe, expect, it } from 'vitest'
import { isGuidedInputValid, keystrokeSequence, nextKeystroke, shiftKeyFor } from '../lib/keyboard-guide'

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

  it('accepts only a correct target prefix in guided practice', () => {
    expect(isGuidedInputValid('ខ្មែរ', 'ខ្')).toBe(true)
    expect(isGuidedInputValid('ខ្មែរ', 'ក')).toBe(false)
  })

  it('matches the NIDA extended backslash and comma keys', () => {
    expect(nextKeystroke('ឮ', '')).toMatchObject({ code: 'Backslash', shift: false })
    expect(nextKeystroke('ឭ', '')).toMatchObject({ code: 'Backslash', shift: true })
    expect(nextKeystroke('ុំ', '')).toMatchObject({ code: 'Comma', shift: false })
  })

  it('turns a Khmer cluster into a teachable key sequence', () => {
    expect(keystrokeSequence('ខ្មែរ').map(step => step.code)).toEqual(['KeyX', 'KeyJ', 'KeyM', 'KeyE', 'KeyR'])
  })
})
