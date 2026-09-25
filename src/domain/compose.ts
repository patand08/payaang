import type { SyllableParts, ToneMark } from './types.ts'

const TONE_CHAR: Record<ToneMark, string> = {
  none: '',
  maiEk: '่',
  maiTho: '้',
  maiTri: '๊',
  maiChattawa: '๋',
}

export function composeSyllable(parts: SyllableParts): string {
  const glyphs =
    parts.final && parts.vowel.closed ? parts.vowel.closed : parts.vowel.open

  return [
    glyphs.leading ?? '',
    parts.initial.thai,
    glyphs.above ?? '',
    glyphs.below ?? '',
    TONE_CHAR[parts.toneMark],
    glyphs.trailing ?? '',
    parts.final?.thai ?? '',
  ].join('')
}
