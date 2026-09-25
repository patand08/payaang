import { describe, expect, it } from 'vitest'
import { VOWELS, getVowel } from './vowels.ts'

describe('vowel catalog', () => {
  it('covers the simple Thai vowels including diphthongs', () => {
    expect(VOWELS.map((vowel) => vowel.id)).toEqual([
      'a',
      'aa',
      'i',
      'ii',
      'ue',
      'uee',
      'u',
      'uu',
      'e',
      'ee',
      'ae',
      'aee',
      'o',
      'oo',
      'aw',
      'aaw',
      'oe',
      'oee',
      'ia',
      'iia',
      'eua',
      'euua',
      'ua',
      'uua',
      'am',
      'ai-muan',
      'ai-malai',
      'ao',
    ])
  })

  it('marks inherent-coda vowels as not taking an extra final', () => {
    for (const id of ['am', 'ai-muan', 'ai-malai', 'ao'] as const) {
      const vowel = getVowel(id)
      expect(vowel.allowsFinal).toBe(false)
      expect(vowel.inherentFinal).not.toBeNull()
    }
  })

  it('uses ั when short a is closed and ะ when it is open', () => {
    const a = getVowel('a')
    expect(a.length).toBe('short')
    expect(a.allowsFinal).toBe(true)
    expect(a.open).toEqual({ trailing: 'ะ' })
    expect(a.closed).toEqual({ above: 'ั' })
  })

  it('writes closed short o with no vowel glyph (กน)', () => {
    const o = getVowel('o')
    expect(o.length).toBe('short')
    expect(o.open).toEqual({ leading: 'โ', trailing: 'ะ' })
    expect(o.closed).toEqual({})
  })

  it('gives long เออ a closed form with ิ (เกิน)', () => {
    const oee = getVowel('oee')
    expect(oee.open).toEqual({ leading: 'เ', trailing: 'อ' })
    expect(oee.closed).toEqual({ leading: 'เ', above: 'ิ' })
  })
})
