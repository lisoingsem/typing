import { normalize as betterKhmerNormalize } from './vendor/betterkhmer'

/** Canonicalize visually equivalent Khmer sequences for fair comparison. */
export function normalizeKhmer(text: string): string {
  return betterKhmerNormalize(text.normalize('NFC'))
}
