export type RandomSource = () => number

export function defaultRng(): number {
  return Math.random()
}

export function mulberry32(seed: number): RandomSource {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function pickIndex(length: number, rng: RandomSource): number {
  if (length <= 0) {
    throw new Error('Cannot pick from an empty list')
  }
  const index = Math.floor(rng() * length)
  return Math.min(length - 1, Math.max(0, index))
}

export function pick<T>(items: readonly T[], rng: RandomSource): T {
  return items[pickIndex(items.length, rng)] as T
}

export function chance(probability: number, rng: RandomSource): boolean {
  return rng() < probability
}
