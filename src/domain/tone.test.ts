import { describe, expect, it } from 'vitest'
import {
  computeSpokenTone,
  isLiveSyllable,
  legalToneMarks,
} from './tone.ts'

describe('isLiveSyllable', () => {
  it('treats stop finals as dead', () => {
    expect(isLiveSyllable('long', 'k')).toBe(false)
    expect(isLiveSyllable('short', 't')).toBe(false)
    expect(isLiveSyllable('long', 'p')).toBe(false)
  })

  it('treats sonorant finals as live', () => {
    expect(isLiveSyllable('short', 'n')).toBe(true)
    expect(isLiveSyllable('short', 'm')).toBe(true)
    expect(isLiveSyllable('long', 'ng')).toBe(true)
    expect(isLiveSyllable('short', 'y')).toBe(true)
    expect(isLiveSyllable('short', 'w')).toBe(true)
  })

  it('uses vowel length when there is no final', () => {
    expect(isLiveSyllable('long', null)).toBe(true)
    expect(isLiveSyllable('short', null)).toBe(false)
  })
})

describe('computeSpokenTone', () => {
  it('follows unmarked class + live/dead rules', () => {
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'none',
      }),
    ).toBe('mid')
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'short',
        finalSound: null,
        toneMark: 'none',
      }),
    ).toBe('low')
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'short',
        finalSound: 'k',
        toneMark: 'none',
      }),
    ).toBe('low')
    expect(
      computeSpokenTone({
        consonantClass: 'high',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'none',
      }),
    ).toBe('rising')
    expect(
      computeSpokenTone({
        consonantClass: 'high',
        vowelLength: 'short',
        finalSound: 'k',
        toneMark: 'none',
      }),
    ).toBe('low')
    expect(
      computeSpokenTone({
        consonantClass: 'low',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'none',
      }),
    ).toBe('mid')
    expect(
      computeSpokenTone({
        consonantClass: 'low',
        vowelLength: 'short',
        finalSound: 'k',
        toneMark: 'none',
      }),
    ).toBe('high')
    expect(
      computeSpokenTone({
        consonantClass: 'low',
        vowelLength: 'long',
        finalSound: 'k',
        toneMark: 'none',
      }),
    ).toBe('falling')
  })

  it('maps tone marks by class', () => {
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'maiEk',
      }),
    ).toBe('low')
    expect(
      computeSpokenTone({
        consonantClass: 'low',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'maiEk',
      }),
    ).toBe('falling')
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'maiTho',
      }),
    ).toBe('falling')
    expect(
      computeSpokenTone({
        consonantClass: 'low',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'maiTho',
      }),
    ).toBe('high')
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'maiTri',
      }),
    ).toBe('high')
    expect(
      computeSpokenTone({
        consonantClass: 'mid',
        vowelLength: 'long',
        finalSound: null,
        toneMark: 'maiChattawa',
      }),
    ).toBe('rising')
  })
})

describe('legalToneMarks', () => {
  it('allows ๊ and ๋ only on mid-class live syllables', () => {
    expect(legalToneMarks({ consonantClass: 'mid', live: true })).toEqual([
      'none',
      'maiEk',
      'maiTho',
      'maiTri',
      'maiChattawa',
    ])
    expect(legalToneMarks({ consonantClass: 'mid', live: false })).toEqual([
      'none',
      'maiEk',
      'maiTho',
    ])
    expect(legalToneMarks({ consonantClass: 'high', live: true })).toEqual([
      'none',
      'maiEk',
      'maiTho',
    ])
    expect(legalToneMarks({ consonantClass: 'low', live: false })).toEqual([
      'none',
      'maiEk',
      'maiTho',
    ])
  })
})
