import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppProvider } from '../AppContext'
import { ProgressView } from '../components/ProgressView'

describe('ProgressView', () => {
  it('should render progress view', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Your Progress')).toBeInTheDocument()
  })

  it('should display learned words stat', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Learned Words')).toBeInTheDocument()
  })

  it('should display accuracy stat', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Accuracy')).toBeInTheDocument()
  })

  it('should display difficult words stat', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Difficult Words')).toBeInTheDocument()
  })

  it('should display reviewed today stat', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Reviewed Today')).toBeInTheDocument()
  })

  it('should display learning tips section', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('💡 Learning Tips')).toBeInTheDocument()
  })

  it('should display tip content', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Review difficult words regularly')).toBeInTheDocument()
  })

  it('should display stat labels', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ProgressView) }
      )
    )
    expect(screen.getByText('Words with 3+ correct answers')).toBeInTheDocument()
  })
})
