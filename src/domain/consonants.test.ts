import { describe, expect, it } from 'vitest'
import {
  CONSONANTS,
  FINALS,
  INITIALS,
  getConsonant,
} from './consonants.ts'
import type { ConsonantClass, FinalSound } from './types.ts'

const NOT_FINALS = new Set(['ฉ', 'ผ', 'ฝ', 'ห', 'อ', 'ฮ'])

const FINAL_SOUND: Record<string, FinalSound> = {
  ก: 'k',
  ข: 'k',
  ฃ: 'k',
  ค: 'k',
  ฅ: 'k',
  ฆ: 'k',
  ง: 'ng',
  จ: 't',
  ช: 't',
  ซ: 't',
  ฌ: 't',
  ฎ: 't',
  ฏ: 't',
  ฐ: 't',
  ฑ: 't',
  ฒ: 't',
  ด: 't',
  ต: 't',
  ถ: 't',
  ท: 't',
  ธ: 't',
  ศ: 't',
  ษ: 't',
  ส: 't',
  น: 'n',
  ณ: 'n',
  ญ: 'n',
  ร: 'n',
  ล: 'n',
  ฬ: 'n',
  บ: 'p',
  ป: 'p',
  พ: 'p',
  ฟ: 'p',
  ภ: 'p',
  ม: 'm',
  ย: 'y',
  ว: 'w',
}

const CLASS_OF: Record<string, ConsonantClass> = {
  ก: 'mid',
  จ: 'mid',
  ฎ: 'mid',
  ฏ: 'mid',
  ด: 'mid',
  ต: 'mid',
  บ: 'mid',
  ป: 'mid',
  อ: 'mid',
  ข: 'high',
  ฃ: 'high',
  ฉ: 'high',
  ฐ: 'high',
  ถ: 'high',
  ผ: 'high',
  ฝ: 'high',
  ศ: 'high',
  ษ: 'high',
  ส: 'high',
  ห: 'high',
}

describe('consonant catalog', () => {
  it('has the 44 traditional letters including obsolete ฃ and ฅ', () => {
    expect(CONSONANTS).toHaveLength(44)
    expect(getConsonant('ฃ').class).toBe('high')
    expect(getConsonant('ฃ').initialIpa).toBe('kʰ')
    expect(getConsonant('ฅ').class).toBe('low')
    expect(getConsonant('ฅ').initialIpa).toBe('kʰ')
  })

  it('uses unique Thai letters in traditional order', () => {
    const letters = CONSONANTS.map((c) => c.thai)
    expect(new Set(letters).size).toBe(44)
    expect(letters.join('')).toBe(
      'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ',
    )
  })

  it('treats every letter as a valid initial', () => {
    expect(INITIALS).toHaveLength(44)
    expect(CONSONANTS.every((c) => c.canBeInitial)).toBe(true)
  })

  it('allows finals only for the eight ending groups', () => {
    expect(FINALS).toHaveLength(38)
    for (const consonant of CONSONANTS) {
      if (NOT_FINALS.has(consonant.thai)) {
        expect(consonant.canBeFinal).toBe(false)
        expect(consonant.finalSound).toBeNull()
      } else {
        expect(consonant.canBeFinal).toBe(true)
        expect(consonant.finalSound).toBe(FINAL_SOUND[consonant.thai])
      }
    }
  })

  it('assigns high/mid/low class correctly, with remaining letters low', () => {
    const counts = { mid: 0, high: 0, low: 0 }
    for (const consonant of CONSONANTS) {
      const expected = CLASS_OF[consonant.thai] ?? 'low'
      expect(consonant.class).toBe(expected)
      counts[consonant.class] += 1
    }
    expect(counts).toEqual({ mid: 9, high: 11, low: 24 })
  })

  it('includes traditional names for ก', () => {
    const ko = getConsonant('ก')
    expect(ko.nameThai).toBe('กอ ไก่')
    expect(ko.nameRoman).toBe('ko kai')
    expect(ko.nameIpa).toBe('kɔː kàj')
    expect(ko.initialIpa).toBe('k')
    expect(ko.initialRoman).toBe('k')
  })

  it('gives every letter a Thai, roman, and IPA name', () => {
    for (const consonant of CONSONANTS) {
      expect(consonant.nameThai.length).toBeGreaterThan(0)
      expect(consonant.nameRoman.length).toBeGreaterThan(0)
      expect(consonant.nameIpa.length).toBeGreaterThan(0)
    }
  })
})
