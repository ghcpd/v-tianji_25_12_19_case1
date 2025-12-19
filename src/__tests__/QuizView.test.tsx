import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../AppContext'
import { QuizView } from '../components/QuizView'

describe('QuizView', () => {
  it('should render quiz setup screen', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(QuizView) }
      )
    )
    expect(screen.getByText('Start a Quiz')).toBeInTheDocument()
  })

  it('should display quiz type options', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(QuizView) }
      )
    )
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument()
    expect(screen.getByText('Flashcard')).toBeInTheDocument()
    expect(screen.getByText('Typing')).toBeInTheDocument()
  })

  it('should have clickable quiz type buttons', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(QuizView) }
      )
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should display quiz description text', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(QuizView) }
      )
    )
    expect(screen.getByText('Choose a quiz type to begin learning:')).toBeInTheDocument()
  })

  it('should display descriptions for each quiz type', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(QuizView) }
      )
    )
    expect(screen.getByText('Select the correct translation')).toBeInTheDocument()
  })
})
