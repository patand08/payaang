export type ConsonantClass = 'mid' | 'high' | 'low'

export type FinalSound = 'k' | 't' | 'p' | 'n' | 'm' | 'ng' | 'y' | 'w'

export type VowelLength = 'short' | 'long'

export type ToneMark = 'none' | 'maiEk' | 'maiTho' | 'maiTri' | 'maiChattawa'

export type SpokenTone = 'mid' | 'low' | 'falling' | 'high' | 'rising'

export type GlyphParts = {
  leading?: string
  above?: string
  below?: string
  trailing?: string
}

export type Consonant = {
  thai: string
  class: ConsonantClass
  nameThai: string
  nameRoman: string
  nameIpa: string
  initialIpa: string
  initialRoman: string
  canBeInitial: boolean
  canBeFinal: boolean
  finalSound: FinalSound | null
}

export type Vowel = {
  id: string
  length: VowelLength
  roman: string
  ipa: string
  allowsFinal: boolean
  inherentFinal: FinalSound | null
  inherentFinalIpa: string | null
  open: GlyphParts
  closed?: GlyphParts
}

export type SyllableParts = {
  initial: Consonant
  vowel: Vowel
  toneMark: ToneMark
  final: Consonant | null
}
