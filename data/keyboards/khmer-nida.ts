import type { Finger, KhmerKey } from '~/types/keyboard'

const f = (code: string, latin: string, normal: string, shift: string, finger: Finger, width = 1): KhmerKey =>
  ({ code, latin, normal, shift, finger, width })

/** Data-only Khmer NIDA layout. UI components must not embed Khmer mappings. */
export const khmerNidaLayout: KhmerKey[][] = [
  [
    f('Backquote', '`', '«', '»', 'left-pinky'), f('Digit1', '1', '១', '!', 'left-pinky'),
    f('Digit2', '2', '២', 'ៗ', 'left-ring'), f('Digit3', '3', '៣', '"', 'left-middle'),
    f('Digit4', '4', '៤', '៛', 'left-index'), f('Digit5', '5', '៥', '%', 'left-index'),
    f('Digit6', '6', '៦', '៍', 'right-index'), f('Digit7', '7', '៧', '័', 'right-index'),
    f('Digit8', '8', '៨', '៏', 'right-middle'), f('Digit9', '9', '៩', '(', 'right-ring'),
    f('Digit0', '0', '០', ')', 'right-pinky'), f('Minus', '-', 'ឥ', '៌', 'right-pinky'),
    f('Equal', '=', 'ឲ', '=', 'right-pinky'),
  ],
  [
    f('Tab', 'tab', '', '', 'left-pinky', 1.45), f('KeyQ', 'Q', 'ឆ', 'ឈ', 'left-pinky'),
    f('KeyW', 'W', 'ឹ', 'ឺ', 'left-ring'), f('KeyE', 'E', 'េ', 'ែ', 'left-middle'),
    f('KeyR', 'R', 'រ', 'ឬ', 'left-index'), f('KeyT', 'T', 'ត', 'ទ', 'left-index'),
    f('KeyY', 'Y', 'យ', 'ួ', 'right-index'), f('KeyU', 'U', 'ុ', 'ូ', 'right-index'),
    f('KeyI', 'I', 'ិ', 'ី', 'right-middle'), f('KeyO', 'O', 'ោ', 'ៅ', 'right-ring'),
    f('KeyP', 'P', 'ផ', 'ភ', 'right-pinky'), f('BracketLeft', '[', 'ៀ', 'ឿ', 'right-pinky'),
    f('BracketRight', ']', 'ឪ', 'ឧ', 'right-pinky'), f('Backslash', '\\', 'ឭ', 'ឳ', 'right-pinky'),
  ],
  [
    f('CapsLock', 'caps', '', '', 'left-pinky', 1.75), f('KeyA', 'A', 'ា', 'ាំ', 'left-pinky'),
    f('KeyS', 'S', 'ស', 'ៃ', 'left-ring'), f('KeyD', 'D', 'ដ', 'ឌ', 'left-middle'),
    f('KeyF', 'F', 'ថ', 'ធ', 'left-index'), f('KeyG', 'G', 'ង', 'អ', 'left-index'),
    f('KeyH', 'H', 'ហ', 'ះ', 'right-index'), f('KeyJ', 'J', '្', 'ញ', 'right-index'),
    f('KeyK', 'K', 'ក', 'គ', 'right-middle'), f('KeyL', 'L', 'ល', 'ឡ', 'right-ring'),
    f('Semicolon', ';', 'ើ', 'ោះ', 'right-pinky'), f('Quote', "'", '់', '៉', 'right-pinky'),
    f('Enter', 'enter', '', '', 'right-pinky', 1.9),
  ],
  [
    f('ShiftLeft', 'shift', '', '', 'left-pinky', 2.25), f('KeyZ', 'Z', 'ឋ', 'ឍ', 'left-pinky'),
    f('KeyX', 'X', 'ខ', 'ឃ', 'left-ring'), f('KeyC', 'C', 'ច', 'ជ', 'left-middle'),
    f('KeyV', 'V', 'វ', 'េះ', 'left-index'), f('KeyB', 'B', 'ប', 'ព', 'left-index'),
    f('KeyN', 'N', 'ន', 'ណ', 'right-index'), f('KeyM', 'M', 'ម', 'ំ', 'right-index'),
    f('Comma', ',', 'ំ', 'ុះ', 'right-middle'), f('Period', '.', '។', '៕', 'right-ring'),
    f('Slash', '/', '៊', '?', 'right-pinky'), f('ShiftRight', 'shift', '', '', 'right-pinky', 2.35),
  ],
  [
    f('ControlLeft', 'ctrl', '', '', 'left-pinky', 1.4), f('AltLeft', 'alt', '', '', 'left-pinky', 1.3),
    f('Space', 'space', ' ', ' ', 'right-index', 7.2), f('AltRight', 'alt gr', '', '', 'right-pinky', 1.5),
    f('ControlRight', 'ctrl', '', '', 'right-pinky', 1.4),
  ],
]

export const khmerKeyByCode = new Map(khmerNidaLayout.flat().map(key => [key.code, key]))
