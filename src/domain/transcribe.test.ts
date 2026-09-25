import { describe, expect, it } from 'vitest'
import { getConsonant } from './consonants.ts'
import { transcribe } from './transcribe.ts'
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

describe('transcribe', () => {
  it('romanizes and IPAs unmarked กา as mid', () => {
    expect(transcribe(parts({ initial: 'ก', vowel: 'aa' }))).toMatchObject({
      roman: 'kaa',
      ipa: '/kaː˧/',
      class: 'mid',
      tone: 'mid',
      toneMark: 'none',
    })
  })

  it('applies spoken-tone diacritics for ก่า ก้า ก๊า ก๋า', () => {
    expect(
      transcribe(parts({ initial: 'ก', vowel: 'aa', toneMark: 'maiEk' })),
    ).toMatchObject({ roman: 'kàa', ipa: '/kaː˨/', tone: 'low' })
    expect(
      transcribe(parts({ initial: 'ก', vowel: 'aa', toneMark: 'maiTho' })),
    ).toMatchObject({ roman: 'kâa', ipa: '/kaː˥˩/', tone: 'falling' })
    expect(
      transcribe(parts({ initial: 'ก', vowel: 'aa', toneMark: 'maiTri' })),
    ).toMatchObject({ roman: 'káa', ipa: '/kaː˦/', tone: 'high' })
    expect(
      transcribe(
        parts({ initial: 'ก', vowel: 'aa', toneMark: 'maiChattawa' }),
      ),
    ).toMatchObject({ roman: 'kǎa', ipa: '/kaː˨˦/', tone: 'rising' })
  })

  it('uses class for unmarked ขา and คา / ค่า / ค้า', () => {
    expect(transcribe(parts({ initial: 'ข', vowel: 'aa' }))).toMatchObject({
      roman: 'khǎa',
      ipa: '/kʰaː˨˦/',
      class: 'high',
      tone: 'rising',
    })
    expect(transcribe(parts({ initial: 'ค', vowel: 'aa' }))).toMatchObject({
      roman: 'khaa',
      ipa: '/kʰaː˧/',
      class: 'low',
      tone: 'mid',
    })
    expect(
      transcribe(parts({ initial: 'ค', vowel: 'aa', toneMark: 'maiEk' })),
    ).toMatchObject({ roman: 'khâa', ipa: '/kʰaː˥˩/', tone: 'falling' })
    expect(
      transcribe(parts({ initial: 'ค', vowel: 'aa', toneMark: 'maiTho' })),
    ).toMatchObject({ roman: 'kháa', ipa: '/kʰaː˦/', tone: 'high' })
  })

  it('treats กะ and กก as dead low', () => {
    expect(transcribe(parts({ initial: 'ก', vowel: 'a' }))).toMatchObject({
      roman: 'kà',
      ipa: '/kaʔ˨/',
      tone: 'low',
    })
    expect(
      transcribe(parts({ initial: 'ก', vowel: 'o', final: 'ก' })),
    ).toMatchObject({
      roman: 'kòk',
      ipa: '/kok˨/',
      tone: 'low',
    })
  })
})
