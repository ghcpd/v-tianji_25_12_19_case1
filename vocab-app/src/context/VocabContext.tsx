import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { VocabWord } from '../data/mockVocab'
import { mockVocab } from '../data/mockVocab'

export interface WordProgress {
  attempts: number
  correct: number
  difficult: boolean
}

export interface VocabContextType {
  words: VocabWord[]
  progress: Record<number, WordProgress>
  markDifficult: (id: number, difficult: boolean) => void
  recordAnswer: (id: number, correct: boolean) => void
}

const VocabContext = createContext<VocabContextType | undefined>(undefined)

export function useVocab() {
  const ctx = useContext(VocabContext)
  if (!ctx) {
    throw new Error('useVocab must be used within VocabProvider')
  }
  return ctx
}

export function VocabProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<number, WordProgress>>({})

  const markDifficult = (id: number, difficult: boolean) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { attempts: 0, correct: 0, difficult: false }), difficult },
    }))
  }

  const recordAnswer = (id: number, correct: boolean) => {
    setProgress((prev) => {
      const prevP = prev[id] ?? { attempts: 0, correct: 0, difficult: false }
      return {
        ...prev,
        [id]: {
          ...prevP,
          attempts: prevP.attempts + 1,
          correct: prevP.correct + (correct ? 1 : 0),
        },
      }
    })
  }

  return (
    <VocabContext.Provider value={{ words: mockVocab, progress, markDifficult, recordAnswer }}>
      {children}
    </VocabContext.Provider>
  )
}
