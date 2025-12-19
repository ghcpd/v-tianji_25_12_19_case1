export type Word = {
  id: string
  term: string
  meaning: string
  example?: string
  difficult?: boolean
  score?: number // higher is better
}

export type QuizMode = 'multiple' | 'typing' | 'flashcard'
