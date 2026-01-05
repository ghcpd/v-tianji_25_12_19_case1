import React from 'react'
import { useApp } from '../AppContext'
import '../styles/ReviewView.css'

export const ReviewView: React.FC = () => {
  const { getReviewQueue, toggleWordDifficulty, currentListId } = useApp()
  const reviewQueue = getReviewQueue()

  if (!currentListId) {
    return <div className="empty-state">Select a word list to view review queue</div>
  }

  if (reviewQueue.length === 0) {
    return (
      <div className="empty-state">
        <h3>🎉 Great job!</h3>
        <p>No words to review right now. Keep practicing to build your vocabulary!</p>
      </div>
    )
  }

  return (
    <div className="review-view">
      <h2>Review Queue</h2>
      <p className="queue-info">{reviewQueue.length} words to review</p>

      <div className="review-list">
        {reviewQueue.map((word, idx) => (
          <div key={word.id} className="review-item">
            <div className="review-number">{idx + 1}</div>
            <div className="review-content">
              <h4>{word.english}</h4>
              <p className="definition">{word.translation}</p>
              <div className="review-stats">
                <span className={`badge ${word.difficult ? 'difficult' : 'normal'}`}>
                  {word.difficult ? '⭐ Difficult' : '📚 Learning'}
                </span>
                <span className="attempts">{word.correctAttempts}/{word.totalAttempts} correct</span>
              </div>
            </div>
            <button
              className={`toggle-difficulty ${word.difficult ? 'active' : ''}`}
              onClick={() => toggleWordDifficulty(currentListId, word.id)}
              title={word.difficult ? 'Mark as easy' : 'Mark as difficult'}
            >
              {word.difficult ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>

      <div className="review-suggestions">
        <h3>📝 Review Suggestions</h3>
        <ul>
          <li>Start with difficult words (marked with ⭐)</li>
          <li>Focus on words with low correct attempt ratios</li>
          <li>Use flashcard mode for quick review</li>
          <li>Practice typing mode to improve retention</li>
        </ul>
      </div>
    </div>
  )
}
