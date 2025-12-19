export interface Word {
  id: string
  english: string
  translation: string
  pronunciation?: string
  difficult: boolean
  correctAttempts: number
  totalAttempts: number
  lastReviewedAt?: Date
}

export interface WordList {
  id: string
  name: string
  description?: string
  words: Word[]
  createdAt: Date
  updatedAt: Date
}

export interface QuizQuestion {
  wordId: string
  english: string
  translation: string
  options: string[]
  correctAnswer: string
  userAnswer?: string
  isCorrect?: boolean
}

export interface QuizSession {
  id: string
  listId: string
  startedAt: Date
  completedAt?: Date
  questions: QuizQuestion[]
  currentQuestionIndex: number
  score: number
  type: 'multiple-choice' | 'flashcard' | 'typing'
}

export interface ProgressStats {
  totalWords: number
  learnedWords: number
  difficultWords: number
  reviewedToday: number
  accuracy: number
  consecutiveCorrect: number
}
