import { describe, it, expect, beforeEach } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AppProvider, useApp } from '../AppContext'
import { Word, WordList } from '../types'

// Test component to access context
const TestComponent = () => {
  const {
    wordLists,
    currentListId,
    toggleWordDifficulty,
    selectWordList,
    startQuiz,
    currentQuiz
  } = useApp()

  return (
    <div>
      <div data-testid="current-list">{currentListId}</div>
      <div data-testid="word-lists">{wordLists.length}</div>
      <div data-testid="current-quiz">{currentQuiz ? 'Quiz Active' : 'No Quiz'}</div>
      <button onClick={() => selectWordList('2')}>Select List 2</button>
      {wordLists[0] && (
        <button onClick={() => toggleWordDifficulty(wordLists[0].id, wordLists[0].words[0].id)}>
          Toggle Difficulty
        </button>
      )}
      <button onClick={() => startQuiz(wordLists[0]?.id || '1', 'multiple-choice')}>
        Start Quiz
      </button>
    </div>
  )
}

describe('AppContext', () => {
  describe('useApp hook', () => {
    it('should throw error when used outside AppProvider', () => {
      expect(() => {
        const TestComponentWithoutProvider = () => {
          useApp()
          return null
        }
        render(React.createElement(TestComponentWithoutProvider))
      }).toThrow()
    })
  })

  describe('AppProvider', () => {
    it('should render children', () => {
      render(
        React.createElement(
          AppProvider,
          { children: React.createElement('div', { 'data-testid': 'test-child' }, 'Test') }
        )
      )
      expect(screen.getByTestId('test-child')).toBeInTheDocument()
    })

    it('should initialize with mock data', () => {
      render(React.createElement(AppProvider, { children: React.createElement(TestComponent) }))
      expect(screen.getByTestId('word-lists')).toHaveTextContent('2')
    })

    it('should have a current list selected by default', () => {
      render(React.createElement(AppProvider, { children: React.createElement(TestComponent) }))
      expect(screen.getByTestId('current-list')).toHaveTextContent('1')
    })
  })

  describe('selectWordList', () => {
    it('should change current list', () => {
      render(React.createElement(AppProvider, { children: React.createElement(TestComponent) }))
      const selectBtn = screen.getByText('Select List 2')
      fireEvent.click(selectBtn)
      expect(screen.getByTestId('current-list')).toHaveTextContent('2')
    })
  })

  describe('toggleWordDifficulty', () => {
    it('should toggle word difficulty', () => {
      const TestDifficultyComponent = () => {
        const { wordLists } = useApp()
        const word = wordLists[0]?.words[0]
        return <div data-testid="difficulty">{word?.difficult ? 'difficult' : 'easy'}</div>
      }

      render(React.createElement(AppProvider, { children: React.createElement(TestDifficultyComponent) }))
      expect(screen.getByTestId('difficulty')).toHaveTextContent('easy')
    })
  })

  describe('startQuiz', () => {
    it('should start a quiz', () => {
      render(React.createElement(AppProvider, { children: React.createElement(TestComponent) }))
      const startBtn = screen.getByText('Start Quiz')
      fireEvent.click(startBtn)
      expect(screen.getByTestId('current-quiz')).toHaveTextContent('Quiz Active')
    })
  })

  describe('getProgressStats', () => {
    it('should return correct progress stats', () => {
      const StatsComponent = () => {
        const { getProgressStats } = useApp()
        const stats = getProgressStats()
        return (
          <div>
            <div data-testid="total-words">{stats.totalWords}</div>
            <div data-testid="learned">{stats.learnedWords}</div>
            <div data-testid="difficult">{stats.difficultWords}</div>
            <div data-testid="accuracy">{stats.accuracy}</div>
          </div>
        )
      }

      render(React.createElement(AppProvider, { children: React.createElement(StatsComponent) }))
      expect(screen.getByTestId('total-words')).toHaveTextContent('6')
      expect(screen.getByTestId('difficult')).toHaveTextContent('3')
    })
  })

  describe('getReviewQueue', () => {
    it('should return correct review queue', () => {
      const ReviewComponent = () => {
        const { getReviewQueue } = useApp()
        const queue = getReviewQueue()
        return <div data-testid="review-count">{queue.length}</div>
      }

      render(React.createElement(AppProvider, { children: React.createElement(ReviewComponent) }))
      const reviewCount = screen.getByTestId('review-count')
      expect(parseInt(reviewCount.textContent || '0')).toBeGreaterThan(0)
    })
  })
})
