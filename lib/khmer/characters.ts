export const INVISIBLE_KHMER_CHARACTERS = {
  '\u200b': 'ZWSP',
  '\u200c': 'ZWNJ',
  '\u200d': 'ZWJ',
  '\u00a0': 'NBSP',
} as const

export function describeInvisibleCharacters(text: string): string[] {
  return Array.from(text)
    .map(character => INVISIBLE_KHMER_CHARACTERS[character as keyof typeof INVISIBLE_KHMER_CHARACTERS])
    .filter((name): name is NonNullable<typeof name> => Boolean(name))
}
