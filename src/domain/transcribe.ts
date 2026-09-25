import { computeSpokenTone } from './tone.ts'
import type {
  FinalSound,
  SpokenTone,
  SyllableParts,
  ToneMark,
} from './types.ts'

const CHAO: Record<SpokenTone, string> = {
  mid: '˧',
  low: '˨',
  falling: '˥˩',
  high: '˦',
  rising: '˨˦',
}

const FINAL_IPA: Record<FinalSound, string> = {
  k: 'k',
  t: 't',
  p: 'p',
  n: 'n',
  m: 'm',
  ng: 'ŋ',
  y: 'j',
  w: 'w',
}

const FINAL_ROMAN: Record<FinalSound, string> = {
  k: 'k',
  t: 't',
  p: 'p',
  n: 'n',
  m: 'm',
  ng: 'ng',
  y: 'i',
  w: 'o',
}

const TONE_VOWEL: Record<Exclude<SpokenTone, 'mid'>, Record<string, string>> = {
  low: { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù' },
  falling: { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û' },
  high: { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' },
  rising: { a: 'ǎ', e: 'ě', i: 'ǐ', o: 'ǒ', u: 'ǔ' },
}

export function codaSound(parts: SyllableParts): FinalSound | null {
  if (parts.final?.finalSound) {
    return parts.final.finalSound
  }
  return parts.vowel.inherentFinal
}

function applySpokenTone(romanVowel: string, tone: SpokenTone): string {
  if (tone === 'mid') {
    return romanVowel
  }
  const first = romanVowel[0]
  if (!first) {
    return romanVowel
  }
  const marked = TONE_VOWEL[tone][first]
  if (!marked) {
    return romanVowel
  }
  return marked + romanVowel.slice(1)
}

export function transcribe(parts: SyllableParts): {
  roman: string
  ipa: string
  class: SyllableParts['initial']['class']
  tone: SpokenTone
  toneMark: ToneMark
} {
  const finalSound = codaSound(parts)
  const tone = computeSpokenTone({
    consonantClass: parts.initial.class,
    vowelLength: parts.vowel.length,
    finalSound,
    toneMark: parts.toneMark,
  })

  const writtenFinalRoman = parts.final?.finalSound
    ? FINAL_ROMAN[parts.final.finalSound]
    : ''
  const roman =
    parts.initial.initialRoman +
    applySpokenTone(parts.vowel.roman, tone) +
    writtenFinalRoman

  let codaIpa = ''
  if (parts.final?.finalSound) {
    codaIpa = FINAL_IPA[parts.final.finalSound]
  } else if (parts.vowel.inherentFinalIpa) {
    codaIpa = parts.vowel.inherentFinalIpa
  } else if (parts.vowel.length === 'short') {
    codaIpa = 'ʔ'
  }

  const ipa = `/${parts.initial.initialIpa}${parts.vowel.ipa}${codaIpa}${CHAO[tone]}/`

  return {
    roman,
    ipa,
    class: parts.initial.class,
    tone,
    toneMark: parts.toneMark,
  }
}
