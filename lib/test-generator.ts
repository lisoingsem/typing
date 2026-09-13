import beginnerWords from '../data/content/km/beginner-words.json'
import quotes from '../data/content/km/quotes.json'
import commonWords from '../data/content/km/words.json'
import type { TestMode } from '~/types/typing'

function mulberry32(seed: number) {
  return () => {
    let value = seed += 0x6D2B79F5
    value = Math.imul(value ^ value >>> 15, value | 1)
    value ^= value + Math.imul(value ^ value >>> 7, value | 61)
    return ((value ^ value >>> 14) >>> 0) / 4294967296
  }
}

function toKhmerDigits(value: number): string {
  return String(value).replace(/\d/g, digit => '០១២៣៤៥៦៧៨៩'[Number(digit)]!)
}

function pickDifferentWord(words: string[], random: () => number, previous = ''): string {
  let word = words[Math.floor(random() * words.length)] ?? words[0]!
  if (words.length > 1 && word === previous) {
    word = words[(words.indexOf(word) + 1) % words.length] ?? words[0]!
  }
  return word
}

export function generateTest(
  mode: TestMode,
  parameter: number,
  punctuation = false,
  numbers = false,
  seed = Date.now(),
): string {
  if (mode === 'quote') return quotes[Math.abs(seed) % quotes.length] ?? quotes[0]!
  if (mode === 'syllables') {
    const random = mulberry32(seed)
    const words: string[] = []
    for (let index = 0; index < parameter; index++) {
      words.push(pickDifferentWord(beginnerWords, random, words.at(-1)))
    }
    return words.join(' ')
  }
  const random = mulberry32(seed)
  const count = mode === 'words' ? parameter : Math.max(42, parameter * 2)
  const words: string[] = []
  for (let index = 0; index < count; index++) {
    let word = pickDifferentWord(commonWords, random, words.at(-1))
    if (numbers && index > 0 && index % 11 === 0) word = toKhmerDigits(Math.floor(random() * 90) + 10)
    if (punctuation && index > 0 && index % 9 === 0) word += index % 18 === 0 ? '។' : '៖'
    words.push(word)
  }
  return words.join(' ')
}
