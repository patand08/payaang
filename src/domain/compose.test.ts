import { describe, expect, it } from 'vitest'
import { getConsonant } from './consonants.ts'
import { composeSyllable } from './compose.ts'
import type { SyllableParts, ToneMark } from './types.ts'
import { getVowel } from './vowels.ts'

function parts(input: {
  initial: string
  vowel: string
  toneMark?: ToneMark
  final?: string
}): SyllableParts {
  return {
    initial: getConsonant(input.initial),
    vowel: getVowel(input.vowel),
    toneMark: input.toneMark ?? 'none',
    final: input.final ? getConsonant(input.final) : null,
  }
}

describe('composeSyllable', () => {
  it('places vowels, tone marks, and finals in Unicode order', () => {
    expect(composeSyllable(parts({ initial: 'ก', vowel: 'aa' }))).toBe('กา')
    expect(
      composeSyllable(parts({ initial: 'ก', vowel: 'i', final: 'น' })),
    ).toBe('กิน')
    expect(
      composeSyllable(parts({ initial: 'ก', vowel: 'aa', toneMark: 'maiEk' })),
    ).toBe('ก่า')
  })

  it('uses open vs closed glyph forms', () => {
    expect(composeSyllable(parts({ initial: 'ก', vowel: 'a' }))).toBe('กะ')
    expect(
      composeSyllable(parts({ initial: 'ก', vowel: 'a', final: 'ก' })),
    ).toBe('กัก')
    expect(composeSyllable(parts({ initial: 'ก', vowel: 'o' }))).toBe('โกะ')
    expect(
      composeSyllable(parts({ initial: 'ก', vowel: 'o', final: 'ก' })),
    ).toBe('กก')
    expect(
      composeSyllable(parts({ initial: 'ก', vowel: 'oee', final: 'น' })),
    ).toBe('เกิน')
  })

  it('composes inherent-coda vowels without a second final', () => {
    expect(composeSyllable(parts({ initial: 'ก', vowel: 'am' }))).toBe('กำ')
    expect(composeSyllable(parts({ initial: 'ก', vowel: 'ai-malai' }))).toBe(
      'ไก',
    )
    expect(composeSyllable(parts({ initial: 'ก', vowel: 'ao' }))).toBe('เกา')
  })
})
