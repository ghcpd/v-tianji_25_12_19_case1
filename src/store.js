import React, { createContext, useContext, useReducer } from 'react'
import { SAMPLE_WORDS } from './data/words'

const initialState = {
  words: SAMPLE_WORDS.map(w => ({ ...w, progress: 0, difficult: false })),
  currentListId: 'default',
  session: null, // { mode: 'flash'|'quiz', index, queue, correct }
  reviewQueue: [] // array of word ids marked difficult
}

const ACTIONS = {
  TOGGLE_DIFFICULT: 'TOGGLE_DIFFICULT',
  START_SESSION: 'START_SESSION',
  NEXT_CARD: 'NEXT_CARD',
  ANSWER_QUIZ: 'ANSWER_QUIZ',
  RECORD_STUDY: 'RECORD_STUDY',
  RESET_PROGRESS: 'RESET_PROGRESS'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_DIFFICULT: {
      const words = state.words.map(w => w.id === action.payload ? { ...w, difficult: !w.difficult } : w)
      const reviewQueue = words.filter(w => w.difficult).map(w => w.id)
      return { ...state, words, reviewQueue }
    }
    case ACTIONS.START_SESSION: {
      const { mode, subset } = action.payload
      const queue = subset && subset.length ? subset : state.words.map(w => w.id)
      return { ...state, session: { mode, index: 0, queue, correct: 0, attempted: 0 } }
    }
    case ACTIONS.NEXT_CARD: {
      if (!state.session) return state
      const nextIndex = state.session.index + 1
      const finished = nextIndex >= state.session.queue.length
      return { ...state, session: finished ? null : { ...state.session, index: nextIndex } }
    }
    case ACTIONS.ANSWER_QUIZ: {
      if (!state.session) return state
      const { correct } = action.payload
      const updated = { ...state.session, correct: state.session.correct + (correct ? 1 : 0), attempted: state.session.attempted + 1 }
      // also bump progress for the current word
      const currentId = state.session.queue[state.session.index]
      const words = state.words.map(w => w.id === currentId ? { ...w, progress: Math.min(100, w.progress + (correct ? 20 : 5)) } : w)
      return { ...state, session: updated, words }
    }
    case ACTIONS.RECORD_STUDY: {
      const { id } = action.payload
      const words = state.words.map(w => w.id === id ? { ...w, progress: Math.min(100, w.progress + 10) } : w)
      return { ...state, words }
    }
    case ACTIONS.RESET_PROGRESS: {
      const words = state.words.map(w => ({ ...w, progress: 0, difficult: false }))
      return { ...state, words, reviewQueue: [], session: null }
    }
    default:
      return state
  }
}

const VocContext = createContext(null)

export function VocabularyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const api = {
    state,
    toggleDifficult: id => dispatch({ type: ACTIONS.TOGGLE_DIFFICULT, payload: id }),
    startSession: (mode, subset) => dispatch({ type: ACTIONS.START_SESSION, payload: { mode, subset } }),
    nextCard: () => dispatch({ type: ACTIONS.NEXT_CARD }),
    answerQuiz: correct => dispatch({ type: ACTIONS.ANSWER_QUIZ, payload: { correct } }),
    recordStudy: id => dispatch({ type: ACTIONS.RECORD_STUDY, payload: { id } }),
    resetProgress: () => dispatch({ type: ACTIONS.RESET_PROGRESS })
  }
  return React.createElement(VocContext.Provider, { value: api }, children)
}

export function useVocabulary() {
  const ctx = useContext(VocContext)
  if (!ctx) throw new Error('useVocabulary must be used inside VocabularyProvider')
  return ctx
}
