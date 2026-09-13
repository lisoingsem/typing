import { split } from 'split-khmer'
import { normalizeKhmer } from './normalize'
import type { KhmerWordSegmenter } from '~/types/khmer'

export class SplitKhmerSegmenter implements KhmerWordSegmenter {
  async split(text: string): Promise<string[]> {
    return split(normalizeKhmer(text)).filter(Boolean)
  }
}

export async function splitKhmerWords(text: string): Promise<string[]> {
  return new SplitKhmerSegmenter().split(text)
}
