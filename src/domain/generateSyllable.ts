import { FINALS, INITIALS } from './consonants.ts'
import { composeSyllable } from './compose.ts'
import { chance, pick, type RandomSource } from './rng.ts'
import { isLiveSyllable, legalToneMarks } from './tone.ts'
import { codaSound, transcribe } from './transcribe.ts'
import type { SyllableParts, ToneMark } from './types.ts'
import { VOWELS } from './vowels.ts'

export type GeneratedSyllable = {
  thai: string
  roman: string
  ipa: string
  class: SyllableParts['initial']['class']
  tone: ReturnType<typeof transcribe>['tone']
  toneMark: ToneMark
  parts: SyllableParts
}

export function generateSyllable(
  options: { allowToneMarks: boolean },
  rng: RandomSource,
): GeneratedSyllable {
  const initial = pick(INITIALS, rng)
  const vowel = pick(VOWELS, rng)
  const final =
    vowel.allowsFinal && chance(0.5, rng) ? pick(FINALS, rng) : null

  const parts: SyllableParts = {
    initial,
    vowel,
    toneMark: 'none',
    final,
  }

  if (options.allowToneMarks && chance(0.5, rng)) {
    const live = isLiveSyllable(vowel.length, codaSound(parts))
    const marked = legalToneMarks({
      consonantClass: initial.class,
      live,
    }).filter((mark) => mark !== 'none')
    parts.toneMark = pick(marked, rng)
  }

  const answer = transcribe(parts)
  return {
    thai: composeSyllable(parts),
    roman: answer.roman,
    ipa: answer.ipa,
    class: answer.class,
    tone: answer.tone,
    toneMark: answer.toneMark,
    parts,
  }
}
