# Krupyang Typing

A Khmer-native typing practice application built with Nuxt 3, Vue 3, TypeScript, Tailwind CSS, and Pinia.

## Development

```bash
npm install
npm run dev
```

## Khmer input architecture

- `input` and composition events own text input; key events only drive shortcuts and physical-key visualization.
- BetterKhmer is vendored behind `normalizeKhmer()` for equivalent Khmer Unicode ordering.
- `Intl.Segmenter('km', { granularity: 'grapheme' })` provides visible typing/caret units.
- The active Khmer cluster may remain pending until it is committed, avoiding premature red errors.
- Normal and strict Unicode comparison modes are both available.
- `split-khmer` is isolated behind `KhmerWordSegmenter` so it can be replaced later.
- History and settings remain local to the browser.

## Guided typing mode

The default practice screen includes a Mario-typing-style guide:

- shows the next Khmer character and its physical NIDA key;
- shows when Shift is required and highlights the opposite-hand Shift key;
- pulses the target key with an arrow on the virtual keyboard;
- highlights the correct hand and finger, including the thumb for Space;
- displays live WPM, accuracy, and adaptive coaching while typing;
- marks a pressed wrong physical key in red.
- keeps the lesson on the same target after a wrong character so the learner can retry immediately.

Guided mode and the virtual keyboard can be enabled or disabled independently under Settings.

The vendored BetterKhmer implementation remains under its MIT license; see `lib/khmer/vendor/BETTERKHMER-LICENSE.txt`.
