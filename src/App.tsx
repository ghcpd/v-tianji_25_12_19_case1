import React from 'react'
import { StoreProvider } from './state/store'
import Header from './components/Header'
import StudyList from './components/StudyList'
import Flashcard from './components/Flashcard'
import Quiz from './components/Quiz'
import Progress from './components/Progress'
import Review from './components/Review'

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
          <section className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Study</h2>
            <StudyList />
          </section>
          <aside className="space-y-4">
            <Flashcard wordId="w1" />
            <Quiz />
            <Progress />
            <Review />
          </aside>
        </main>
      </div>
    </StoreProvider>
  )
}
