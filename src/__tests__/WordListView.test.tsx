import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppProvider } from '../AppContext'
import { WordListView } from '../components/WordListView'

describe('WordListView', () => {
  it('should render word list view', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    expect(screen.getByText('Common English Words')).toBeInTheDocument()
  })

  it('should display all words in current list', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    expect(screen.getByText('Serendipity')).toBeInTheDocument()
    expect(screen.getByText('Ephemeral')).toBeInTheDocument()
    expect(screen.getByText('Eloquent')).toBeInTheDocument()
  })

  it('should show word pronunciation when available', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    expect(screen.getByText(/ser-uh-nip-uh-tee/)).toBeInTheDocument()
  })

  it('should show translation for each word', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    expect(screen.getByText('Finding something good by chance')).toBeInTheDocument()
  })

  it('should display word statistics', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    const statsText = screen.getByText(/Total Words: 6/)
    expect(statsText).toBeInTheDocument()
  })

  it('should show attempt counts', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    const correctAttempts = screen.getAllByText(/\d+\/\d+ correct/)
    expect(correctAttempts.length).toBeGreaterThan(0)
  })

  it('should render difficulty buttons', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(WordListView) }
      )
    )
    const buttons = screen.getAllByRole('button', { name: '⭐' })
    expect(buttons.length).toBeGreaterThan(0)
  })
})
