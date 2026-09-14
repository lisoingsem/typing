# Typing by Krupyang

A Khmer-native typing practice application built with Nuxt 3, Vue 3, TypeScript, Tailwind CSS, and Pinia.

## Development

```bash
npm install
npm run dev
```

## Production and Cloudflare Pages

The site is statically generated for Cloudflare Pages:

```bash
npm run build:cloudflare
```

Production URL: <https://typing-2tp.pages.dev>

For Cloudflare Pages Git integration, use:

- Production branch: `main`
- Build command: `npm run build:cloudflare`
- Build output directory: `.output/public`
- Root directory: `/`

Cloudflare provides `CF_PAGES_URL` automatically for canonical links. When using a custom domain, set `NUXT_PUBLIC_SITE_URL` to the final HTTPS origin (for example, `https://example.com`) in the Pages production environment.

For an existing Direct Upload project, deploy from the command line with:

```bash
npm run deploy:cloudflare
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

## Dictionary-backed Khmer practice

Krupyang opens in word mode with a curated corpus of 250 complete Khmer words. The corpus is normalized to the same Unicode order as the typing engine and checked by automated tests. Its source notes are in `data/content/km/SOURCES.md`.

The beginner mode uses a smaller set of 50 complete everyday words. It replaces the earlier unfinished spelling fragments while keeping the guided NIDA keyboard experience. For each visible cluster the guide:

- breaks the cluster into the actual NIDA keystroke sequence;
- labels the base consonant, coeng/subscript consonant, vowel, and marks;
- advances the builder one component at a time;
- combines the cluster builder with correct-only input, finger guidance, and live coaching.

Timed, word-count, natural-sentence, and beginner modes are available. Optional generated numbers use Khmer digits.

The vendored BetterKhmer implementation remains under its MIT license; see `lib/khmer/vendor/BETTERKHMER-LICENSE.txt`.
