import type {
  ConsonantClass,
  FinalSound,
  SpokenTone,
  ToneMark,
  VowelLength,
} from './types.ts'

const STOPS = new Set<FinalSound>(['k', 't', 'p'])
const SONORANTS = new Set<FinalSound>(['n', 'm', 'ng', 'y', 'w'])

export function isLiveSyllable(
  vowelLength: VowelLength,
  finalSound: FinalSound | null,
): boolean {
  if (finalSound && STOPS.has(finalSound)) {
    return false
  }
  if (finalSound && SONORANTS.has(finalSound)) {
    return true
  }
  return vowelLength === 'long'
}

export function computeSpokenTone(input: {
  consonantClass: ConsonantClass
  vowelLength: VowelLength
  finalSound: FinalSound | null
  toneMark: ToneMark
}): SpokenTone {
  const live = isLiveSyllable(input.vowelLength, input.finalSound)

  if (input.toneMark === 'maiEk') {
    return input.consonantClass === 'low' ? 'falling' : 'low'
  }
  if (input.toneMark === 'maiTho') {
    return input.consonantClass === 'low' ? 'high' : 'falling'
  }
  if (input.toneMark === 'maiTri') {
    return 'high'
  }
  if (input.toneMark === 'maiChattawa') {
    return 'rising'
  }

  if (input.consonantClass === 'mid') {
    return live ? 'mid' : 'low'
  }
  if (input.consonantClass === 'high') {
    return live ? 'rising' : 'low'
  }
  if (live) {
    return 'mid'
  }
  return input.vowelLength === 'short' ? 'high' : 'falling'
}

export function legalToneMarks(input: {
  consonantClass: ConsonantClass
  live: boolean
}): ToneMark[] {
  const marks: ToneMark[] = ['none', 'maiEk', 'maiTho']
  if (input.consonantClass === 'mid' && input.live) {
    marks.push('maiTri', 'maiChattawa')
  }
  return marks
}
