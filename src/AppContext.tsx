import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Word, WordList, QuizSession, ProgressStats } from './types'
import { mockWordLists, generateId, calculateAccuracy, generateQuizOptions } from './mockData'

interface AppContextType {
  wordLists: WordList[]
  currentListId: string | null
  currentQuiz: QuizSession | null
  addWordList: (list: WordList) => void
  selectWordList: (listId: string) => void
  toggleWordDifficulty: (listId: string, wordId: string) => void
  updateWord: (listId: string, wordId: string, updates: Partial<Word>) => void
  startQuiz: (listId: string, type: 'multiple-choice' | 'flashcard' | 'typing') => void
  answerQuestion: (index: number, answer: string) => void
  nextQuestion: () => void
  completeQuiz: () => void
  getProgressStats: () => ProgressStats
  getReviewQueue: () => Word[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wordLists, setWordLists] = useState<WordList[]>(mockWordLists)
  const [currentListId, setCurrentListId] = useState<string | null>('1')
  const [currentQuiz, setCurrentQuiz] = useState<QuizSession | null>(null)

  const addWordList = (list: WordList) => {
    setWordLists([...wordLists, list])
  }

  const selectWordList = (listId: string) => {
    setCurrentListId(listId)
  }

  const toggleWordDifficulty = (listId: string, wordId: string) => {
    setWordLists(
      wordLists.map(list =>
        list.id === listId
          ? {
              ...list,
              words: list.words.map(word =>
                word.id === wordId ? { ...word, difficult: !word.difficult } : word
              )
            }
          : list
      )
    )
  }

  const updateWord = (listId: string, wordId: string, updates: Partial<Word>) => {
    setWordLists(
      wordLists.map(list =>
        list.id === listId
          ? {
              ...list,
              words: list.words.map(word =>
                word.id === wordId ? { ...word, ...updates } : word
              ),
              updatedAt: new Date()
            }
          : list
      )
    )
  }

  const startQuiz = (listId: string, type: 'multiple-choice' | 'flashcard' | 'typing') => {
    const list = wordLists.find(l => l.id === listId)
    if (!list) return

    const questions = list.words.map(word => ({
      wordId: word.id,
      english: word.english,
      translation: word.translation,
      options: generateQuizOptions(word.translation, list.words),
      correctAnswer: word.translation,
      userAnswer: undefined,
      isCorrect: undefined
    }))

    setCurrentQuiz({
      id: generateId(),
      listId,
      startedAt: new Date(),
      questions,
      currentQuestionIndex: 0,
      score: 0,
      type
    })
  }

  const answerQuestion = (index: number, answer: string) => {
    if (!currentQuiz) return

    setCurrentQuiz(prev => {
      if (!prev) return prev
      const question = prev.questions[index]
      const isCorrect = question.correctAnswer === answer

      return {
        ...prev,
        questions: prev.questions.map((q, i) =>
          i === index
            ? { ...q, userAnswer: answer, isCorrect }
            : q
        ),
        score: isCorrect ? prev.score + 1 : prev.score
      }
    })
  }

  const nextQuestion = () => {
    if (!currentQuiz) return
    setCurrentQuiz(prev =>
      prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 } : prev
    )
  }

  const completeQuiz = () => {
    if (!currentQuiz) return

    const listId = currentQuiz.listId
    const newWordLists = wordLists.map(list => {
      if (list.id !== listId) return list

      return {
        ...list,
        words: list.words.map(word => {
          const question = currentQuiz.questions.find(q => q.wordId === word.id)
          if (!question) return word

          return {
            ...word,
            correctAttempts: word.correctAttempts + (question.isCorrect ? 1 : 0),
            totalAttempts: word.totalAttempts + 1,
            lastReviewedAt: new Date()
          }
        })
      }
    })

    setWordLists(newWordLists)
    setCurrentQuiz(null)
  }

  const getProgressStats = (): ProgressStats => {
    const currentList = wordLists.find(l => l.id === currentListId)
    if (!currentList) {
      return {
        totalWords: 0,
        learnedWords: 0,
        difficultWords: 0,
        reviewedToday: 0,
        accuracy: 0,
        consecutiveCorrect: 0
      }
    }

    const words = currentList.words
    const learnedWords = words.filter(w => w.correctAttempts >= 3).length
    const difficultWords = words.filter(w => w.difficult).length
    const today = new Date().toDateString()
    const reviewedToday = words.filter(
      w => w.lastReviewedAt && w.lastReviewedAt.toDateString() === today
    ).length
    const accuracy = calculateAccuracy(words)

    return {
      totalWords: words.length,
      learnedWords,
      difficultWords,
      reviewedToday,
      accuracy,
      consecutiveCorrect: 0
    }
  }

  const getReviewQueue = (): Word[] => {
    const currentList = wordLists.find(l => l.id === currentListId)
    if (!currentList) return []

    return currentList.words
      .filter(w => w.difficult || w.correctAttempts < 3)
      .sort((a, b) => {
        if (a.difficult && !b.difficult) return -1
        if (!a.difficult && b.difficult) return 1
        return a.totalAttempts - b.totalAttempts
      })
  }

  return (
    <AppContext.Provider
      value={{
        wordLists,
        currentListId,
        currentQuiz,
        addWordList,
        selectWordList,
        toggleWordDifficulty,
        updateWord,
        startQuiz,
        answerQuestion,
        nextQuestion,
        completeQuiz,
        getProgressStats,
        getReviewQueue
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
