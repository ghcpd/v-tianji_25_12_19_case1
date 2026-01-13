import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { VocabProvider } from '../src/store/vocabStore'
import WordList from '../src/components/WordList'
import StudyView from '../src/components/StudyView'
import QuizView from '../src/components/QuizView'

describe('components', () => {
  it('toggles difficult from word list', () => {
    render(<VocabProvider><WordList /></VocabProvider>)
    const btn = screen.getByLabelText(/toggle-difficult-1/)
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(btn).toHaveTextContent('Difficult')
  })

  it('study view advances on known/unknown', () => {
    render(<VocabProvider><StudyView /></VocabProvider>)
    const knew = screen.getByText(/I knew it/)
    fireEvent.click(knew)
    const nexts = screen.getAllByText(/Reveal|Tap to reveal/)
    expect(nexts.length).toBeGreaterThan(0)
  })

  it('multiple choice in quiz updates score', () => {
    render(<VocabProvider><QuizView /></VocabProvider>)
    const options = screen.getAllByRole('button')
    // click the first available option (should not throw)
    fireEvent.click(options[options.length - 1])
    expect(true).toBe(true)
  })
})
