import { normalizeKhmer } from './normalize'

let segmenter: Intl.Segmenter | undefined

function getSegmenter(): Intl.Segmenter | undefined {
  if (segmenter) return segmenter
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    segmenter = new Intl.Segmenter('km', { granularity: 'grapheme' })
  }
  return segmenter
}

/** Split into visible caret units, never UTF-16 code units. */
export function segmentKhmer(text: string, normalize = false): string[] {
  const source = normalize ? normalizeKhmer(text) : text
  const intl = getSegmenter()
  if (intl) return Array.from(intl.segment(source), ({ segment }) => segment)
  return Array.from(source)
}

export function isKhmerCluster(value: string): boolean {
  return /[\u1780-\u17ff\u19e0-\u19ff]/u.test(value)
}

export function isBoundaryCluster(value: string): boolean {
  return /^\s+$/u.test(value) || /^[។៕៖ៗ៘៙,.!?;:]$/u.test(value)
}
