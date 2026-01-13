import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { Word } from '../types'
import { mockWords } from '../data/mockWords'

type State = {
  words: Word[]
  reviewQueue: string[]
}

const initialState: State = {
  words: mockWords,
  reviewQueue: []
}

export type Action =
  | { type: 'markDifficult'; id: string }
  | { type: 'updateScore'; id: string; delta: number }
  | { type: 'addWord'; word: Word }
  | { type: 'removeWord'; id: string }
  | { type: 'enqueueReview'; id: string }
  | { type: 'dequeueReview'; id: string }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'markDifficult':
      return {
        ...state,
        words: state.words.map(w => (w.id === action.id ? { ...w, difficult: !w.difficult } : w))
      }
    case 'updateScore':
      return {
        ...state,
        words: state.words.map(w => (w.id === action.id ? { ...w, score: (w.score || 0) + action.delta } : w))
      }
    case 'addWord':
      return { ...state, words: [action.word, ...state.words] }
    case 'removeWord':
      return { ...state, words: state.words.filter(w => w.id !== action.id) }
    case 'enqueueReview':
      if (state.reviewQueue.includes(action.id)) return state
      return { ...state, reviewQueue: [...state.reviewQueue, action.id] }
    case 'dequeueReview':
      return { ...state, reviewQueue: state.reviewQueue.filter(id => id !== action.id) }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const VocabContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined)

export function VocabProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, init => {
    try {
      const raw = localStorage.getItem('vocab_state')
      return raw ? JSON.parse(raw) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('vocab_state', JSON.stringify(state))
    } catch {}
  }, [state])

  return <VocabContext.Provider value={{ state, dispatch }}>{children}</VocabContext.Provider>
}

export function useVocab() {
  const ctx = useContext(VocabContext)
  if (!ctx) throw new Error('useVocab must be used within VocabProvider')
  return ctx
}

export { reducer, initialState }
