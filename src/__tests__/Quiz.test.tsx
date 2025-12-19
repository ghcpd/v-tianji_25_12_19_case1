import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Quiz from '../components/Quiz'
import { StoreProvider } from '../state/store'

test('quiz shows a question and selecting answers advances', async () => {
  render(
    <StoreProvider>
      <Quiz />
    </StoreProvider>
  )
  const question = screen.getByText(/what is the meaning of/i)
  expect(question).toBeInTheDocument()
  const options = await screen.findAllByRole('button')
  expect(options.length).toBeGreaterThanOrEqual(3)
  await userEvent.click(options[0])
  // Score updates are shown
  expect(screen.getByText(/score:/i)).toBeInTheDocument()
})
