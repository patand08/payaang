import { describe, expect, it } from 'vitest'
import { FINALS } from './consonants.ts'
import { generateSyllable } from './generateSyllable.ts'
import { mulberry32 } from './rng.ts'
import { isLiveSyllable, legalToneMarks } from './tone.ts'
import { codaSound } from './transcribe.ts'

describe('generateSyllable', () => {
  it('never stacks a final on inherent-coda vowels', () => {
    const rng = mulberry32(7)
    for (let i = 0; i < 400; i += 1) {
      const syllable = generateSyllable({ allowToneMarks: true }, rng)
      if (!syllable.parts.vowel.allowsFinal) {
        expect(syllable.parts.final).toBeNull()
      }
    }
  })

  it('only uses orthographically legal tone marks', () => {
    const rng = mulberry32(11)
    for (let i = 0; i < 400; i += 1) {
      const syllable = generateSyllable({ allowToneMarks: true }, rng)
      const live = isLiveSyllable(
        syllable.parts.vowel.length,
        codaSound(syllable.parts),
      )
      const legal = legalToneMarks({
        consonantClass: syllable.parts.initial.class,
        live,
      })
      expect(legal).toContain(syllable.toneMark)
    }
  })

  it('omits tone marks when the option is off', () => {
    const rng = mulberry32(13)
    for (let i = 0; i < 200; i += 1) {
      const syllable = generateSyllable({ allowToneMarks: false }, rng)
      expect(syllable.toneMark).toBe('none')
    }
  })

  it('follows the injected RNG for a known sequence', () => {
    const values = [0, 0, 0.9, 0.9]
    const syllable = generateSyllable({ allowToneMarks: false }, () => {
      const next = values.shift()
      if (next === undefined) {
        throw new Error('RNG exhausted')
      }
      return next
    })
    expect(syllable.parts.initial.thai).toBe('ก')
    expect(syllable.parts.vowel.id).toBe('a')
    expect(syllable.parts.final).toBeNull()
    expect(syllable.thai).toBe('กะ')
  })

  it('lands near 50% none for finals and tone marks', () => {
    const rng = mulberry32(99)
    let closedCandidates = 0
    let missingFinal = 0
    let missingTone = 0
    const n = 3000
    for (let i = 0; i < n; i += 1) {
      const syllable = generateSyllable({ allowToneMarks: true }, rng)
      if (syllable.parts.vowel.allowsFinal) {
        closedCandidates += 1
        if (!syllable.parts.final) {
          missingFinal += 1
        }
      }
      if (syllable.toneMark === 'none') {
        missingTone += 1
      }
    }
    const finalNoneRate = missingFinal / closedCandidates
    const toneNoneRate = missingTone / n
    expect(finalNoneRate).toBeGreaterThan(0.4)
    expect(finalNoneRate).toBeLessThan(0.6)
    expect(toneNoneRate).toBeGreaterThan(0.4)
    expect(toneNoneRate).toBeLessThan(0.6)
  })

  it('only picks real ending consonants as finals', () => {
    const rng = mulberry32(3)
    for (let i = 0; i < 200; i += 1) {
      const syllable = generateSyllable({ allowToneMarks: false }, rng)
      if (syllable.parts.final) {
        expect(FINALS).toContain(syllable.parts.final)
      }
    }
  })
})
