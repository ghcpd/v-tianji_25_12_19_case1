import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Flashcard from '../components/Flashcard'
import { StoreProvider } from '../state/store'

test('flashcard flips and marks correct/difficult', async () => {
  render(
    <StoreProvider>
      <Flashcard wordId="w1" />
    </StoreProvider>
  )
  const flip = screen.getByRole('button', { name: /flip/i })
  await userEvent.click(flip)
  expect(screen.getByText(/hello/i)).toBeInTheDocument()

  const mark = screen.getByRole('button', { name: /mark-correct/i })
  await userEvent.click(mark)
  // After marking correct, progress should have entry; check header via rendering a small component
})
