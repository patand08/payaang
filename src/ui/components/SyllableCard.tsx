import type { QuizItem } from '../../game/types.ts'

type SyllableCardProps = {
  item: QuizItem
  revealed: boolean
  onReveal: () => void
}

export function SyllableCard({ item, revealed, onReveal }: SyllableCardProps) {
  return (
    <div className="card">
      <button
        type="button"
        className="prompt"
        style={{ fontFamily: item.fontFamily }}
        aria-label={revealed ? 'Answer revealed' : 'Reveal answer'}
        onClick={onReveal}
        disabled={revealed}
      >
        {item.thai}
      </button>
      {revealed ? (
        <dl className="answer">
          {item.kind === 'consonant' ? (
            <>
              <dt>Thai name</dt>
              <dd>{item.nameThai}</dd>
            </>
          ) : null}
          <dt>Romanization</dt>
          <dd>{item.roman}</dd>
          <dt>IPA</dt>
          <dd>{item.ipa}</dd>
          <dt>Class</dt>
          <dd>{item.class}</dd>
          {item.kind === 'syllable' ? (
            <>
              <dt>Tone</dt>
              <dd>{item.tone}</dd>
            </>
          ) : null}
        </dl>
      ) : null}
    </div>
  )
}
