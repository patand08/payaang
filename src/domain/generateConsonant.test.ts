import { describe, expect, it } from 'vitest'
import { CONSONANTS } from './consonants.ts'
import { generateConsonant } from './generateConsonant.ts'

describe('generateConsonant', () => {
  it('picks from the 44-letter catalog using the injected RNG', () => {
    const first = generateConsonant(() => 0)
    expect(first.thai).toBe('ก')
    expect(first.nameThai).toBe('กอ ไก่')
    expect(first.roman).toBe('ko kai')
    expect(first.ipa).toBe('/kɔː kàj/')
    expect(first.class).toBe('mid')
  })

  it('can pick the last letter', () => {
    const last = generateConsonant(() => 0.999)
    expect(last.thai).toBe(CONSONANTS[CONSONANTS.length - 1]?.thai)
  })
})
