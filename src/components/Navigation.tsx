import React, { useState } from 'react'
import { useApp } from '../AppContext'
import '../styles/Navigation.css'

type ViewType = 'words' | 'quiz' | 'progress' | 'review'

interface NavigationProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { wordLists, currentListId, selectWordList } = useApp()
  const [showListMenu, setShowListMenu] = useState(false)

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>📚 Vocabulary Learning</h1>
      </div>

      <div className="list-selector">
        <button
          className="list-dropdown-btn"
          onClick={() => setShowListMenu(!showListMenu)}
        >
          {wordLists.find(l => l.id === currentListId)?.name || 'Select List'}
          <span className="dropdown-icon">▼</span>
        </button>

        {showListMenu && (
          <div className="list-menu">
            {wordLists.map(list => (
              <button
                key={list.id}
                className={`list-option ${list.id === currentListId ? 'active' : ''}`}
                onClick={() => {
                  selectWordList(list.id)
                  setShowListMenu(false)
                }}
              >
                {list.name}
                <span className="word-count">{list.words.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="nav-menu">
        <button
          className={`nav-btn ${currentView === 'words' ? 'active' : ''}`}
          onClick={() => onViewChange('words')}
        >
          📖 Words
        </button>
        <button
          className={`nav-btn ${currentView === 'quiz' ? 'active' : ''}`}
          onClick={() => onViewChange('quiz')}
        >
          ✏️ Quiz
        </button>
        <button
          className={`nav-btn ${currentView === 'progress' ? 'active' : ''}`}
          onClick={() => onViewChange('progress')}
        >
          📊 Progress
        </button>
        <button
          className={`nav-btn ${currentView === 'review' ? 'active' : ''}`}
          onClick={() => onViewChange('review')}
        >
          🔄 Review
        </button>
      </div>
    </nav>
  )
}
