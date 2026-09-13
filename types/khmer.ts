export interface KhmerWordSegmenter {
  split(text: string): Promise<string[]>
}

export interface KhmerComparison {
  equal: boolean
  expected: string
  typed: string
  mode: 'normal' | 'strict'
}
