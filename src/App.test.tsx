import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from './App.tsx'

describe('App', () => {
  it('starts a game, reveals an answer, and grades it', async () => {
    const user = userEvent.setup()
    render(<App rng={() => 0} />)

    expect(
      screen.getByRole('heading', { name: 'Páyaang' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Start' }))

    expect(screen.getByLabelText('Progress')).toHaveTextContent('1 / 50')
    expect(screen.getByRole('button', { name: 'Right' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Wrong' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))

    expect(screen.getByText('Romanization')).toBeInTheDocument()
    expect(screen.getByText('IPA')).toBeInTheDocument()
    expect(screen.getByText('Class')).toBeInTheDocument()
    expect(screen.getByText('Tone')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Right' })).toBeEnabled()

    await user.click(screen.getByRole('button', { name: 'Right' }))
    expect(screen.getByLabelText('Progress')).toHaveTextContent('2 / 50')
  })

  it('plays consonant-only mode and can return from a loss', async () => {
    const user = userEvent.setup()
    render(<App rng={() => 0} />)

    await user.click(screen.getByRole('checkbox', { name: 'Consonant only' }))
    await user.click(screen.getByRole('button', { name: 'Start' }))

    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))
    expect(screen.getByText('Thai name')).toBeInTheDocument()
    expect(screen.getByText('กอ ไก่')).toBeInTheDocument()
    expect(screen.queryByText('Tone')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Wrong' }))
    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))
    await user.click(screen.getByRole('button', { name: 'Wrong' }))
    await user.click(screen.getByRole('button', { name: 'Reveal answer' }))
    await user.click(screen.getByRole('button', { name: 'Wrong' }))

    expect(
      screen.getByRole('heading', { name: 'Game over' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Play again' }))
    expect(
      screen.getByRole('heading', { name: 'Páyaang' }),
    ).toBeInTheDocument()
  })
})
