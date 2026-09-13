import { describe, expect, it } from 'vitest'
import beginnerWords from '../data/content/km/beginner-words.json'
import quotes from '../data/content/km/quotes.json'
import words from '../data/content/km/words.json'
import { normalizeKhmer } from '../lib/khmer/normalize'
import { generateTest } from '../lib/test-generator'

const khmerWord = /^[\u1780-\u17ff\u19e0-\u19ff]+$/u

describe('Khmer practice content', () => {
  it('contains a substantial, unique dictionary corpus', () => {
    expect(words.length).toBeGreaterThanOrEqual(250)
    expect(new Set(words).size).toBe(words.length)
  })

  it.each([
    ['common', words],
    ['beginner', beginnerWords],
  ])('%s entries are complete normalized Khmer words', (_name, entries) => {
    for (const word of entries) {
      expect(word).toMatch(khmerWord)
      expect(word).toBe(normalizeKhmer(word))
      expect(word).not.toContain('\u200b')
    }
  })

  it('does not reintroduce unfinished beginner fragments', () => {
    expect(beginnerWords).not.toEqual(expect.arrayContaining(['ខ្មែ', 'ព្យា', 'ក្ត', 'ស្ត']))
  })

  it('keeps every quote normalized and sentence-complete', () => {
    for (const quote of quotes) {
      expect(quote).toBe(normalizeKhmer(quote))
      expect(quote.endsWith('។')).toBe(true)
    }
  })

  it('generates complete dictionary words without adjacent repeats', () => {
    const generated = generateTest('words', 50, false, false, 2026).split(' ')
    expect(generated).toHaveLength(50)
    expect(generated.every(word => words.includes(word))).toBe(true)
    expect(generated.every((word, index) => index === 0 || word !== generated[index - 1])).toBe(true)
  })

  it('uses complete beginner words and Khmer digits', () => {
    const beginnerTest = generateTest('syllables', 20, false, false, 2026).split(' ')
    const numberedTest = generateTest('words', 25, false, true, 2026)

    expect(beginnerTest.every(word => beginnerWords.includes(word))).toBe(true)
    expect(numberedTest).toMatch(/[០-៩]/u)
    expect(numberedTest).not.toMatch(/[0-9]/u)
  })
})
