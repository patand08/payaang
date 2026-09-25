import { useReducer, useState } from 'react'
import { defaultRng, type RandomSource } from './domain/rng.ts'
import { gameReducer } from './game/reducer.ts'
import { INITIAL_STATE, type GameOptions } from './game/types.ts'
import { OptionsScreen } from './ui/screens/OptionsScreen.tsx'
import { PlayScreen } from './ui/screens/PlayScreen.tsx'
import { ResultScreen } from './ui/screens/ResultScreen.tsx'

const DEFAULT_OPTIONS: GameOptions = {
  allowToneMarks: true,
  allowDifferentFonts: false,
  consonantOnly: false,
}

export function App({ rng = defaultRng }: { rng?: RandomSource }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  const [options, setOptions] = useState<GameOptions>(DEFAULT_OPTIONS)

  if (state.screen === 'options') {
    return (
      <OptionsScreen
        options={options}
        onChange={setOptions}
        onStart={() => dispatch({ type: 'start', options, rng })}
      />
    )
  }

  if (state.screen === 'play') {
    return (
      <PlayScreen
        state={state}
        onReveal={() => dispatch({ type: 'reveal' })}
        onGrade={(verdict) => dispatch({ type: 'grade', verdict, rng })}
      />
    )
  }

  return (
    <ResultScreen
      state={state}
      onPlayAgain={() => dispatch({ type: 'playAgain' })}
    />
  )
}

export default App
