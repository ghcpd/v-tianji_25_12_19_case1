import React from 'react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from '../App'
import { VocabularyProvider } from '../store'

function renderApp(){
  return render(React.createElement(VocabularyProvider, null, React.createElement(App, null)))
}

describe('App UI flows', () => {
  it('renders and starts a flashcard session', () => {
    renderApp()
    const startBtn = screen.getByText(/Start Flashcards/i)
    fireEvent.click(startBtn)
    expect(screen.getByTestId('flashcard')).toBeInTheDocument()
    const know = screen.getByTestId('know-btn')
    fireEvent.click(know)
    // after marking known, either next card or session null
    expect(screen.queryByTestId('flashcard')).not.toBeNull()
  })

  it('marks a word difficult from sidebar and it appears in review queue', () => {
    renderApp()
    const toggle = screen.getByTestId('toggle-w2')
    fireEvent.click(toggle)
    // review queue count in header
    const badge = screen.getByText(/Review queue:/i)
    expect(badge).toHaveTextContent('1')
    // open review panel (disambiguate multiple matches)
    const matches = screen.getAllByText(/Review Queue/i)
    const reviewList = matches.find(el => el.closest('.panel'))
    const parent = reviewList.closest('.panel')
    expect(within(parent).getByText(/benevolent/i)).toBeDefined()
  })

  it('performs a typing quiz and provides feedback', () => {
    renderApp()
    const quizBtn = screen.getByText(/Start Quiz/i)
    fireEvent.click(quizBtn)
    // switch to type mode
    const typeBtn = screen.getByText('Type')
    fireEvent.click(typeBtn)
    const input = screen.getByTestId('type-input')
    fireEvent.change(input, { target: { value: 'wrong' } })
    const submit = screen.getByTestId('submit-type')
    fireEvent.click(submit)
    // feedback (incorrect) should show soon — it's async with timeout, but attempted increments
    // Check that incorrect feedback is shown
    expect(screen.getByText(/Incorrect/i)).toBeDefined()
  })
})
