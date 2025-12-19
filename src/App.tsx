import React, { useState } from 'react'
import { AppProvider } from './AppContext'
import { Navigation } from './components/Navigation'
import { WordListView } from './components/WordListView'
import { QuizView } from './components/QuizView'
import { ProgressView } from './components/ProgressView'
import { ReviewView } from './components/ReviewView'
import './styles/App.css'

type ViewType = 'words' | 'quiz' | 'progress' | 'review'

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('words')

  return (
    <div className="app">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        {currentView === 'words' && <WordListView />}
        {currentView === 'quiz' && <QuizView />}
        {currentView === 'progress' && <ProgressView />}
        {currentView === 'review' && <ReviewView />}
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
