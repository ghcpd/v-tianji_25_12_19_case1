import React, { createContext, useContext, useReducer } from 'react'
import { sampleLists, Word } from '../data/words'

export type State = {
  lists: typeof sampleLists
  difficult: Set<string>
  progress: Record<string, number>
}

export type Action =
  | { type: 'toggle-difficult'; wordId: string }
  | { type: 'mark-correct'; wordId: string }
  | { type: 'reset' }

const initialState: State = {
  lists: sampleLists,
  difficult: new Set(),
  progress: {},
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle-difficult': {
      const next = new Set(state.difficult)
      if (next.has(action.wordId)) next.delete(action.wordId)
      else next.add(action.wordId)
      return { ...state, difficult: next }
    }
    case 'mark-correct': {
      const current = state.progress[action.wordId] ?? 0
      return { ...state, progress: { ...state.progress, [action.wordId]: current + 1 } }
    }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

export function findWordById(id: string): Word | undefined {
  for (const l of sampleLists) {
    const w = l.words.find((x) => x.id === id)
    if (w) return w
  }
  return undefined
}
