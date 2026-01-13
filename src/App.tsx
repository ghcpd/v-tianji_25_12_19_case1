import React, { useState } from 'react'
import { VocabProvider } from './store/vocabStore'
import Header from './components/Header'
import WordList from './components/WordList'
import StudyView from './components/StudyView'
import QuizView from './components/QuizView'
import ReviewView from './components/ReviewView'

export default function App() {
  const [route, setRoute] = useState<'study' | 'quiz' | 'list' | 'review'>('study')

  return (
    <VocabProvider>
      <div className="min-h-screen flex items-start justify-center py-10 px-4">
        <div className="container">
          <Header route={route} setRoute={setRoute} />
          <div className="mt-6">
            {route === 'study' && <StudyView />}
            {route === 'quiz' && <QuizView />}
            {route === 'list' && <WordList />}
            {route === 'review' && <ReviewView />}
          </div>
        </div>
      </div>
    </VocabProvider>
  )
}
