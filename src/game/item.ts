import { generateConsonant } from '../domain/generateConsonant.ts'
import { generateSyllable } from '../domain/generateSyllable.ts'
import { pick, type RandomSource } from '../domain/rng.ts'
import { DEFAULT_THAI_FONT, THAI_FONTS } from '../ui/fonts.ts'
import type { GameOptions, QuizItem } from './types.ts'

export function generateQuizItem(
  options: GameOptions,
  rng: RandomSource,
): QuizItem {
  const fontFamily = options.allowDifferentFonts
    ? pick(THAI_FONTS, rng)
    : DEFAULT_THAI_FONT

  if (options.consonantOnly) {
    const consonant = generateConsonant(rng)
    return {
      kind: 'consonant',
      thai: consonant.thai,
      fontFamily,
      roman: consonant.roman,
      ipa: consonant.ipa,
      class: consonant.class,
      nameThai: consonant.nameThai,
    }
  }

  const syllable = generateSyllable(
    { allowToneMarks: options.allowToneMarks },
    rng,
  )
  return {
    kind: 'syllable',
    thai: syllable.thai,
    fontFamily,
    roman: syllable.roman,
    ipa: syllable.ipa,
    class: syllable.class,
    tone: syllable.tone,
  }
}
