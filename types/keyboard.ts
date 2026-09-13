export type Finger =
  | 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index'
  | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky'

export interface KhmerKey {
  code: string
  latin: string
  normal?: string
  shift?: string
  altGr?: string
  shiftAltGr?: string
  finger: Finger
  width?: number
}
