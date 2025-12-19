import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../AppContext'
import { Navigation } from '../components/Navigation'

describe('Navigation', () => {
  const mockOnViewChange = () => {}

  it('should render navigation', () => {
    render(
      React.createElement(
        AppProvider,
        {
          children: React.createElement(Navigation, {
            currentView: 'words',
            onViewChange: mockOnViewChange
          })
        }
      )
    )
    expect(screen.getByText('📚 Vocabulary Learning')).toBeInTheDocument()
  })

  it('should display all navigation buttons', () => {
    render(
      React.createElement(
        AppProvider,
        {
          children: React.createElement(Navigation, {
            currentView: 'words',
            onViewChange: mockOnViewChange
          })
        }
      )
    )
    expect(screen.getByText('📖 Words')).toBeInTheDocument()
    expect(screen.getByText('✏️ Quiz')).toBeInTheDocument()
    expect(screen.getByText('📊 Progress')).toBeInTheDocument()
    expect(screen.getByText('🔄 Review')).toBeInTheDocument()
  })

  it('should display list selector dropdown', () => {
    render(
      React.createElement(
        AppProvider,
        {
          children: React.createElement(Navigation, {
            currentView: 'words',
            onViewChange: mockOnViewChange
          })
        }
      )
    )
    const dropdown = screen.getByText(/Common English Words|Select List/)
    expect(dropdown).toBeInTheDocument()
  })

  it('should mark active navigation item', () => {
    const { container } = render(
      React.createElement(
        AppProvider,
        {
          children: React.createElement(Navigation, {
            currentView: 'words',
            onViewChange: mockOnViewChange
          })
        }
      )
    )
    const activeButtons = container.querySelectorAll('.nav-btn.active')
    expect(activeButtons.length).toBeGreaterThan(0)
  })
})
