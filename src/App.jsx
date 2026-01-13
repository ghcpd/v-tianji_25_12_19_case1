import React from 'react'
import { useVocabulary } from './store'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StudyPanel from './components/StudyPanel'
import QuizPanel from './components/QuizPanel'

export default function App() {
  const { state, startSession, resetProgress } = useVocabulary()

  return (
    <div className="app" data-testid="app-root">
      <div className="header">
        <div className="brand">
          <div className="logo">VL</div>
          <div>
            <div className="title">Vocab Learn</div>
            <div className="subtitle">Study, quiz, and review difficult words — mock data only</div>
          </div>
        </div>
        <div className="controls">
          <button className="btn" onClick={() => startSession('flash')}>Start Flashcards</button>
          <button className="btn" onClick={() => startSession('quiz')}>Start Quiz</button>
          <button className="btn" onClick={() => startSession('quiz', state.reviewQueue)}>Review Difficult ({state.reviewQueue.length})</button>
          <button className="btn" onClick={() => resetProgress()}>Reset</button>
        </div>
      </div>

      <div className="layout">
        <Sidebar />
        <div>
          <Header />
          <div className="panel" style={{ marginTop: 12 }}>
            {state.session ? (
              state.session.mode === 'flash' ? (
                <StudyPanel />
              ) : (
                <QuizPanel />
              )
            ) : (
              <div className="empty">
                No active session. Use the buttons above to start a flashcard or quiz session.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
