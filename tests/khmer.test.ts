import { describe, expect, it } from 'vitest'
import { compareClusters, compareKhmer } from '../lib/khmer/compare'
import { segmentKhmer } from '../lib/khmer/graphemes'
import { normalizeKhmer } from '../lib/khmer/normalize'

describe('Khmer language layer', () => {
  it('normalizes visually equivalent Khmer order', () => {
    expect(normalizeKhmer('ខែ្មរ')).toBe('ខ្មែរ')
  })

  it('keeps a cluster as a single caret unit', () => {
    expect(segmentKhmer('ខ្មែរ').length).toBeLessThan(Array.from('ខ្មែរ').length)
  })

  it('accepts normalized equivalence but strict mode exposes it', () => {
    expect(compareKhmer('ខ្មែរ', 'ខែ្មរ', 'normal').equal).toBe(true)
    expect(compareKhmer('ខ្មែរ', 'ខែ្មរ', 'strict').equal).toBe(false)
  })

  it('does not mark an unfinished final cluster wrong', () => {
    expect(compareClusters('ខ្មែរ', 'ខ')[0]?.state).toBe('pending')
  })
})
