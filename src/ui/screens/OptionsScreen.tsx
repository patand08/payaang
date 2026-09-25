import type { GameOptions } from '../../game/types.ts'

type OptionsScreenProps = {
  options: GameOptions
  onChange: (options: GameOptions) => void
  onStart: () => void
}

export function OptionsScreen({
  options,
  onChange,
  onStart,
}: OptionsScreenProps) {
  return (
    <main className="screen">
      <header className="brand">
        <p className="brand-thai">พยางค์</p>
        <h1>Páyaang</h1>
        <span className="brand-rule" />
      </header>
      <fieldset className="options">
        <legend>Game options</legend>
        <label>
          <input
            type="checkbox"
            checked={options.allowToneMarks}
            disabled={options.consonantOnly}
            onChange={(event) =>
              onChange({ ...options, allowToneMarks: event.target.checked })
            }
          />
          Allow tone marks
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.allowDifferentFonts}
            onChange={(event) =>
              onChange({
                ...options,
                allowDifferentFonts: event.target.checked,
              })
            }
          />
          Allow different fonts
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.consonantOnly}
            onChange={(event) =>
              onChange({ ...options, consonantOnly: event.target.checked })
            }
          />
          Consonant only
        </label>
      </fieldset>
      <button type="button" className="primary" onClick={onStart}>
        Start
      </button>
    </main>
  )
}
