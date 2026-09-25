import type { ResultState } from '../../game/types.ts'

type ResultScreenProps = {
  state: ResultState
  onPlayAgain: () => void
}

export function ResultScreen({ state, onPlayAgain }: ResultScreenProps) {
  const title = state.outcome === 'won' ? 'You finished' : 'Game over'
  const detail =
    state.outcome === 'won'
      ? `${state.wrongCount} wrong`
      : '3 wrong'

  return (
    <main className={`screen screen--result screen--${state.outcome}`}>
      <h1>{title}</h1>
      <p className="outcome">{detail}</p>
      <button type="button" className="primary" onClick={onPlayAgain}>
        Play again
      </button>
    </main>
  )
}
