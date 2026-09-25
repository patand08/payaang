import type { RandomSource } from '../domain/rng.ts'
import type { ConsonantClass, SpokenTone } from '../domain/types.ts'

export const TARGET_ITEMS = 50
export const MAX_WRONG = 3

export type GameOptions = {
  allowToneMarks: boolean
  allowDifferentFonts: boolean
  consonantOnly: boolean
}

export type SyllableQuizItem = {
  kind: 'syllable'
  thai: string
  fontFamily: string
  roman: string
  ipa: string
  class: ConsonantClass
  tone: SpokenTone
}

export type ConsonantQuizItem = {
  kind: 'consonant'
  thai: string
  fontFamily: string
  roman: string
  ipa: string
  class: ConsonantClass
  nameThai: string
}

export type QuizItem = SyllableQuizItem | ConsonantQuizItem

export type OptionsState = {
  screen: 'options'
}

export type PlayState = {
  screen: 'play'
  options: GameOptions
  item: QuizItem
  itemNumber: number
  wrongCount: number
  revealed: boolean
}

export type ResultState = {
  screen: 'result'
  outcome: 'won' | 'lost'
  wrongCount: number
}

export type GameState = OptionsState | PlayState | ResultState

export type GameAction =
  | { type: 'start'; options: GameOptions; rng: RandomSource }
  | { type: 'reveal' }
  | { type: 'grade'; verdict: 'right' | 'wrong'; rng: RandomSource }
  | { type: 'playAgain' }

export const INITIAL_STATE: GameState = { screen: 'options' }
