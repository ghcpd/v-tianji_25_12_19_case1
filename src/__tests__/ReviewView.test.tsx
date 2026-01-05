import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppProvider } from '../AppContext'
import { ReviewView } from '../components/ReviewView'

describe('ReviewView', () => {
  it('should render review view', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ReviewView) }
      )
    )
    expect(screen.getByText('Review Queue')).toBeInTheDocument()
  })

  it('should display review queue title', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ReviewView) }
      )
    )
    const queueInfo = screen.getByText(/words to review/)
    expect(queueInfo).toBeInTheDocument()
  })

  it('should display review items', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ReviewView) }
      )
    )
    const items = screen.getAllByRole('button')
    expect(items.length).toBeGreaterThan(0)
  })

  it('should display review suggestions section', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ReviewView) }
      )
    )
    expect(screen.getByText('📝 Review Suggestions')).toBeInTheDocument()
  })

  it('should display suggestion items', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ReviewView) }
      )
    )
    expect(screen.getByText('Start with difficult words (marked with ⭐)')).toBeInTheDocument()
  })

  it('should show badges for items', () => {
    render(
      React.createElement(
        AppProvider,
        { children: React.createElement(ReviewView) }
      )
    )
    const badges = screen.getAllByText(/Difficult|Learning/)
    expect(badges.length).toBeGreaterThan(0)
  })
})
