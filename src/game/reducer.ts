import { generateQuizItem } from './item.ts'
import {
  INITIAL_STATE,
  MAX_WRONG,
  TARGET_ITEMS,
  type GameAction,
  type GameState,
} from './types.ts'

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'start':
      return {
        screen: 'play',
        options: action.options,
        item: generateQuizItem(action.options, action.rng),
        itemNumber: 1,
        wrongCount: 0,
        revealed: false,
      }
    case 'reveal':
      if (state.screen !== 'play') {
        return state
      }
      return { ...state, revealed: true }
    case 'grade': {
      if (state.screen !== 'play' || !state.revealed) {
        return state
      }
      const wrongCount =
        state.wrongCount + (action.verdict === 'wrong' ? 1 : 0)
      if (wrongCount >= MAX_WRONG) {
        return { screen: 'result', outcome: 'lost', wrongCount }
      }
      if (state.itemNumber >= TARGET_ITEMS) {
        return { screen: 'result', outcome: 'won', wrongCount }
      }
      return {
        screen: 'play',
        options: state.options,
        item: generateQuizItem(state.options, action.rng),
        itemNumber: state.itemNumber + 1,
        wrongCount,
        revealed: false,
      }
    }
    case 'playAgain':
      return INITIAL_STATE
  }
}
