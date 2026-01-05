import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppProvider } from '../AppContext'
import App from '../App'

describe('App', () => {
  it('should render the app', () => {
    render(React.createElement(App))
    expect(screen.getByText('📚 Vocabulary Learning')).toBeInTheDocument()
  })

  it('should display navigation', () => {
    render(React.createElement(App))
    expect(screen.getByText('📖 Words')).toBeInTheDocument()
    expect(screen.getByText('✏️ Quiz')).toBeInTheDocument()
    expect(screen.getByText('📊 Progress')).toBeInTheDocument()
    expect(screen.getByText('🔄 Review')).toBeInTheDocument()
  })

  it('should display main content area', () => {
    const { container } = render(React.createElement(App))
    const mainContent = container.querySelector('.main-content')
    expect(mainContent).toBeInTheDocument()
  })

  it('should render with AppProvider', () => {
    render(React.createElement(App))
    // If this renders without error, AppProvider is working
    expect(screen.getByText('📚 Vocabulary Learning')).toBeInTheDocument()
  })

  it('should display initial word list content', () => {
    render(React.createElement(App))
    const headings = screen.getAllByText('Common English Words')
    expect(headings.length).toBeGreaterThan(0)
  })
})
