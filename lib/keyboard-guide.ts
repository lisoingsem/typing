import { khmerNidaLayout } from '../data/keyboards/khmer-nida'
import type { Finger, GuidedKeystroke } from '../types/keyboard'

const keyOutputs: GuidedKeystroke[] = khmerNidaLayout.flat().flatMap(key => {
  const outputs: GuidedKeystroke[] = []
  if (key.normal) outputs.push({ value: key.normal, code: key.code, latin: key.latin, finger: key.finger, shift: false })
  if (key.shift && key.shift !== key.normal) outputs.push({ value: key.shift, code: key.code, latin: key.latin, finger: key.finger, shift: true })
  return outputs
}).sort((left, right) => Array.from(right.value).length - Array.from(left.value).length)

export const fingerLabels: Record<Finger, string> = {
  'left-pinky': 'កូនដៃឆ្វេង',
  'left-ring': 'នាងដៃឆ្វេង',
  'left-middle': 'ម្រាមកណ្ដាលឆ្វេង',
  'left-index': 'ចង្អុលដៃឆ្វេង',
  'left-thumb': 'មេដៃឆ្វេង',
  'right-thumb': 'មេដៃស្ដាំ',
  'right-index': 'ចង្អុលដៃស្ដាំ',
  'right-middle': 'ម្រាមកណ្ដាលស្ដាំ',
  'right-ring': 'នាងដៃស្ដាំ',
  'right-pinky': 'កូនដៃស្ដាំ',
}

export function findKeystroke(value: string): GuidedKeystroke | undefined {
  return keyOutputs.find(output => value.startsWith(output.value))
}

/** Resolve the next physical NIDA key from the unconsumed target code points. */
export function nextKeystroke(target: string, typed: string): GuidedKeystroke | undefined {
  const consumed = Array.from(typed).length
  const remaining = Array.from(target).slice(consumed).join('')
  return remaining ? findKeystroke(remaining) : undefined
}

export function shiftKeyFor(keystroke?: GuidedKeystroke): string | undefined {
  if (!keystroke?.shift) return undefined
  return keystroke.finger.startsWith('left-') ? 'ShiftRight' : 'ShiftLeft'
}
