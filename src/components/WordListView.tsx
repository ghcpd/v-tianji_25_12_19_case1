import React from 'react'
import { useApp } from '../AppContext'
import '../styles/WordListView.css'

export const WordListView: React.FC = () => {
  const { wordLists, currentListId, selectWordList, toggleWordDifficulty } = useApp()
  const currentList = wordLists.find(l => l.id === currentListId)

  if (!currentList) {
    return <div className="empty-state">Select a word list to get started</div>
  }

  return (
    <div className="word-list-view">
      <div className="list-header">
        <h2>{currentList.name}</h2>
        <p className="description">{currentList.description}</p>
        <div className="stats">
          <span className="stat">Total Words: {currentList.words.length}</span>
          <span className="stat">
            Difficult: {currentList.words.filter(w => w.difficult).length}
          </span>
        </div>
      </div>

      <div className="words-container">
        {currentList.words.map(word => (
          <div key={word.id} className={`word-card ${word.difficult ? 'difficult' : ''}`}>
            <div className="word-header">
              <div>
                <h3>{word.english}</h3>
                {word.pronunciation && <p className="pronunciation">/{word.pronunciation}/</p>}
              </div>
              <button
                className={`difficulty-btn ${word.difficult ? 'active' : ''}`}
                onClick={() => toggleWordDifficulty(currentList.id, word.id)}
                title={word.difficult ? 'Mark as easy' : 'Mark as difficult'}
              >
                ⭐
              </button>
            </div>

            <p className="translation">{word.translation}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: word.totalAttempts > 0 ? `${(word.correctAttempts / word.totalAttempts) * 100}%` : '0%'
                }}
              />
            </div>
            <p className="attempts">
              {word.correctAttempts}/{word.totalAttempts} correct
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
