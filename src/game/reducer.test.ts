import { describe, expect, it } from 'vitest'
import { mulberry32 } from '../domain/rng.ts'
import { DEFAULT_THAI_FONT } from '../ui/fonts.ts'
import { generateQuizItem } from './item.ts'
import { gameReducer } from './reducer.ts'
import {
  INITIAL_STATE,
  TARGET_ITEMS,
  type GameOptions,
  type GameState,
  type PlayState,
} from './types.ts'

const OPTIONS: GameOptions = {
  allowToneMarks: true,
  allowDifferentFonts: false,
  consonantOnly: false,
}

function play(state: GameState = INITIAL_STATE): PlayState {
  const next = gameReducer(state, {
    type: 'start',
    options: OPTIONS,
    rng: mulberry32(1),
  })
  if (next.screen !== 'play') {
    throw new Error('expected play')
  }
  return next
}

describe('gameReducer', () => {
  it('starts a hidden first item', () => {
    const state = play()
    expect(state.itemNumber).toBe(1)
    expect(state.wrongCount).toBe(0)
    expect(state.revealed).toBe(false)
    expect(state.item.kind).toBe('syllable')
    expect(state.item.fontFamily).toBe(DEFAULT_THAI_FONT)
  })

  it('ignores grading until the item is revealed', () => {
    const hidden = play()
    const same = gameReducer(hidden, {
      type: 'grade',
      verdict: 'wrong',
      rng: mulberry32(2),
    })
    expect(same).toEqual(hidden)
  })

  it('ends the game after three wrong answers', () => {
    let state: GameState = play()
    for (let i = 0; i < 3; i += 1) {
      state = gameReducer(state, { type: 'reveal' })
      state = gameReducer(state, {
        type: 'grade',
        verdict: 'wrong',
        rng: mulberry32(i + 10),
      })
    }
    expect(state).toEqual({
      screen: 'result',
      outcome: 'lost',
      wrongCount: 3,
    })
  })

  it('wins after fifty graded items with fewer than three wrong', () => {
    let state: GameState = play()
    for (let i = 0; i < TARGET_ITEMS; i += 1) {
      state = gameReducer(state, { type: 'reveal' })
      state = gameReducer(state, {
        type: 'grade',
        verdict: i === 0 ? 'wrong' : 'right',
        rng: mulberry32(i + 20),
      })
    }
    expect(state).toEqual({
      screen: 'result',
      outcome: 'won',
      wrongCount: 1,
    })
  })

  it('returns to options on play again', () => {
    const lost: GameState = { screen: 'result', outcome: 'lost', wrongCount: 3 }
    expect(gameReducer(lost, { type: 'playAgain' })).toEqual(INITIAL_STATE)
  })

  it('uses consonant-only items when that option is on', () => {
    const state = gameReducer(INITIAL_STATE, {
      type: 'start',
      options: { ...OPTIONS, consonantOnly: true },
      rng: () => 0,
    })
    expect(state.screen).toBe('play')
    if (state.screen === 'play') {
      expect(state.item.kind).toBe('consonant')
      expect(state.item.thai).toBe('ก')
    }
  })
})

describe('generateQuizItem', () => {
  it('picks a font only when that option is on', () => {
    const plain = generateQuizItem(OPTIONS, () => 0.999)
    expect(plain.fontFamily).toBe(DEFAULT_THAI_FONT)
    const styled = generateQuizItem(
      { ...OPTIONS, allowDifferentFonts: true },
      () => 0.999,
    )
    expect(styled.fontFamily).toBe('Charm')
  })
})
