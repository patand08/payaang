import { CONSONANTS } from './consonants.ts'
import { pick, type RandomSource } from './rng.ts'
import type { ConsonantClass } from './types.ts'

export type GeneratedConsonant = {
  thai: string
  roman: string
  ipa: string
  class: ConsonantClass
  nameThai: string
}

export function generateConsonant(rng: RandomSource): GeneratedConsonant {
  const consonant = pick(CONSONANTS, rng)
  return {
    thai: consonant.thai,
    roman: consonant.nameRoman,
    ipa: `/${consonant.nameIpa}/`,
    class: consonant.class,
    nameThai: consonant.nameThai,
  }
}
