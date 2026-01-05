import { describe, it, expect } from 'vitest'
import { generateQuizOptions, calculateAccuracy, generateId } from '../mockData'
import { mockWordLists } from '../mockData'

describe('Mock Data Utilities', () => {
  describe('generateId', () => {
    it('should generate a unique id', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('should generate a string id', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })
  })

  describe('calculateAccuracy', () => {
    it('should return 0 for empty word list', () => {
      expect(calculateAccuracy([])).toBe(0)
    })

    it('should return 100 for perfect accuracy', () => {
      const words = [
        {
          id: '1',
          english: 'Test',
          translation: 'Testing',
          difficult: false,
          correctAttempts: 5,
          totalAttempts: 5
        }
      ]
      expect(calculateAccuracy(words)).toBe(100)
    })

    it('should calculate accuracy correctly', () => {
      const words = [
        {
          id: '1',
          english: 'Test1',
          translation: 'Testing1',
          difficult: false,
          correctAttempts: 2,
          totalAttempts: 4
        },
        {
          id: '2',
          english: 'Test2',
          translation: 'Testing2',
          difficult: false,
          correctAttempts: 3,
          totalAttempts: 5
        }
      ]
      // (2 + 3) / (4 + 5) = 5/9 = 55.55... -> rounded to 56%
      expect(calculateAccuracy(words)).toBe(56)
    })

    it('should return 0 when no attempts', () => {
      const words = [
        {
          id: '1',
          english: 'Test',
          translation: 'Testing',
          difficult: false,
          correctAttempts: 0,
          totalAttempts: 0
        }
      ]
      expect(calculateAccuracy(words)).toBe(0)
    })
  })

  describe('generateQuizOptions', () => {
    it('should include the correct answer', () => {
      const words = mockWordLists[0].words
      const correctAnswer = words[0].translation
      const options = generateQuizOptions(correctAnswer, words)
      expect(options).toContain(correctAnswer)
    })

    it('should return 4 options', () => {
      const words = mockWordLists[0].words
      const correctAnswer = words[0].translation
      const options = generateQuizOptions(correctAnswer, words)
      expect(options.length).toBe(4)
    })

    it('should not include duplicate options', () => {
      const words = mockWordLists[0].words
      const correctAnswer = words[0].translation
      const options = generateQuizOptions(correctAnswer, words)
      const uniqueOptions = new Set(options)
      expect(uniqueOptions.size).toBe(options.length)
    })
  })
})
