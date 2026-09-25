import { SyllableCard } from '../components/SyllableCard.tsx'
import { MAX_WRONG, TARGET_ITEMS, type PlayState } from '../../game/types.ts'

type PlayScreenProps = {
  state: PlayState
  onReveal: () => void
  onGrade: (verdict: 'right' | 'wrong') => void
}

export function PlayScreen({ state, onReveal, onGrade }: PlayScreenProps) {
  return (
    <main className="screen">
      <header className="status">
        <p aria-label="Progress">
          {state.itemNumber} / {TARGET_ITEMS}
        </p>
        <p aria-label="Wrong answers">
          {state.wrongCount} / {MAX_WRONG} wrong
        </p>
      </header>
      <SyllableCard
        item={state.item}
        revealed={state.revealed}
        onReveal={onReveal}
      />
      <div className="grade">
        <button
          type="button"
          className="grade-wrong"
          disabled={!state.revealed}
          onClick={() => onGrade('wrong')}
        >
          Wrong
        </button>
        <button
          type="button"
          className="grade-right"
          disabled={!state.revealed}
          onClick={() => onGrade('right')}
        >
          Right
        </button>
      </div>
    </main>
  )
}
