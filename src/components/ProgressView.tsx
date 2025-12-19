import React from 'react'
import { useApp } from '../AppContext'
import '../styles/ProgressView.css'

export const ProgressView: React.FC = () => {
  const { getProgressStats } = useApp()
  const stats = getProgressStats()

  const getEmoji = (value: number, max: number): string => {
    const percentage = (value / max) * 100
    if (percentage >= 80) return '🔥'
    if (percentage >= 60) return '⭐'
    if (percentage >= 40) return '📈'
    return '🌱'
  }

  return (
    <div className="progress-view">
      <h2>Your Progress</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-emoji">{getEmoji(stats.learnedWords, stats.totalWords)}</div>
          <div className="stat-content">
            <h3>Learned Words</h3>
            <p className="stat-value">{stats.learnedWords} / {stats.totalWords}</p>
            <p className="stat-label">Words with 3+ correct answers</p>
          </div>
          <div className="stat-bar">
            <div
              className="stat-bar-fill"
              style={{
                width: stats.totalWords > 0 ? `${(stats.learnedWords / stats.totalWords) * 100}%` : '0%'
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">📊</div>
          <div className="stat-content">
            <h3>Accuracy</h3>
            <p className="stat-value">{stats.accuracy}%</p>
            <p className="stat-label">Overall quiz performance</p>
          </div>
          <div className="stat-bar">
            <div
              className="stat-bar-fill"
              style={{
                width: `${stats.accuracy}%`
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">⭐</div>
          <div className="stat-content">
            <h3>Difficult Words</h3>
            <p className="stat-value">{stats.difficultWords}</p>
            <p className="stat-label">Marked for extra review</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">📅</div>
          <div className="stat-content">
            <h3>Reviewed Today</h3>
            <p className="stat-value">{stats.reviewedToday}</p>
            <p className="stat-label">Words studied today</p>
          </div>
        </div>
      </div>

      <div className="progress-tips">
        <h3>💡 Learning Tips</h3>
        <ul>
          <li>Review difficult words regularly</li>
          <li>Aim for 80% accuracy in quizzes</li>
          <li>Practice with different quiz types</li>
          <li>Mark words as difficult if you struggle</li>
          <li>Review the same words multiple times for better retention</li>
        </ul>
      </div>
    </div>
  )
}
