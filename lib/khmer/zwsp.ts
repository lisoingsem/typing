export const removeZeroWidthSpaces = (text: string) => text.replaceAll('\u200b', '')
export const revealZeroWidthSpaces = (text: string) => text.replaceAll('\u200b', '‹ZWSP›')
