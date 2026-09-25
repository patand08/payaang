import { describe, expect, it } from 'vitest'
import { chance, mulberry32, pick, pickIndex } from './rng.ts'

describe('pickIndex', () => {
  it('maps 0 to the first index and nearly-1 to the last', () => {
    expect(pickIndex(4, () => 0)).toBe(0)
    expect(pickIndex(4, () => 0.999)).toBe(3)
  })

  it('rejects an empty list', () => {
    expect(() => pickIndex(0, () => 0)).toThrow(/empty/)
  })
})

describe('pick', () => {
  it('returns the chosen item', () => {
    expect(pick(['a', 'b', 'c'], () => 0)).toBe('a')
    expect(pick(['a', 'b', 'c'], () => 0.9)).toBe('c')
  })
})

describe('chance', () => {
  it('is true below the probability', () => {
    expect(chance(0.5, () => 0.49)).toBe(true)
    expect(chance(0.5, () => 0.5)).toBe(false)
  })
})

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })
})
