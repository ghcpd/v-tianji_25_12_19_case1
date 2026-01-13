import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StudyList from '../components/StudyList'
import { StoreProvider } from '../state/store'

test('can mark a word difficult from StudyList', async () => {
  render(
    <StoreProvider>
      <StudyList />
    </StoreProvider>
  )
  const btn = screen.getByRole('button', { name: /toggle-difficult-w1/i })
  expect(btn).toBeInTheDocument()
  await userEvent.click(btn)
  expect(btn).toHaveTextContent(/Marked/i)
})
