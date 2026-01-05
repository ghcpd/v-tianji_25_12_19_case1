import React, { useState } from 'react'
import { useApp } from '../AppContext'
import '../styles/QuizView.css'

export const QuizView: React.FC = () => {
  const { currentQuiz, answerQuestion, nextQuestion, completeQuiz, wordLists, currentListId } = useApp()
  const [selectedQuizType, setSelectedQuizType] = useState<'multiple-choice' | 'flashcard' | 'typing' | null>(null)
  const currentList = wordLists.find(l => l.id === currentListId)

  if (!currentList) return <div className="empty-state">Select a word list first</div>

  if (!currentQuiz) {
    return (
      <div className="quiz-setup">
        <h2>Start a Quiz</h2>
        <p>Choose a quiz type to begin learning:</p>

        <div className="quiz-types">
          <button
            className="quiz-type-btn"
            onClick={() => {
              setSelectedQuizType('multiple-choice')
              // The app context will handle quiz start
            }}
          >
            <span className="emoji">📝</span>
            <span className="name">Multiple Choice</span>
            <span className="desc">Select the correct translation</span>
          </button>

          <button
            className="quiz-type-btn"
            onClick={() => setSelectedQuizType('flashcard')}
          >
            <span className="emoji">🎴</span>
            <span className="name">Flashcard</span>
            <span className="desc">Reveal and test yourself</span>
          </button>

          <button
            className="quiz-type-btn"
            onClick={() => setSelectedQuizType('typing')}
          >
            <span className="emoji">⌨️</span>
            <span className="name">Typing</span>
            <span className="desc">Type the correct answer</span>
          </button>
        </div>

        {selectedQuizType && (
          <div className="quiz-start-confirm">
            <button
              className="start-btn"
              onClick={() => {
                const app = require('../AppContext').useApp()
                app.startQuiz(currentList.id, selectedQuizType)
              }}
            >
              Start {selectedQuizType.charAt(0).toUpperCase() + selectedQuizType.slice(1)} Quiz
            </button>
            <button className="cancel-btn" onClick={() => setSelectedQuizType(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  }

  const currentQuestion = currentQuiz.questions[currentQuiz.currentQuestionIndex]
  const isLastQuestion = currentQuiz.currentQuestionIndex === currentQuiz.questions.length - 1

  return (
    <div className="quiz-view">
      <div className="quiz-header">
        <div className="progress">
          <h3>Question {currentQuiz.currentQuestionIndex + 1} of {currentQuiz.questions.length}</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuiz.currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`
              }}
            />
          </div>
        </div>
        <div className="score">Score: {currentQuiz.score}/{currentQuiz.questions.length}</div>
      </div>

      <div className="question-container">
        <h2 className="english-word">{currentQuestion.english}</h2>

        {currentQuiz.type === 'multiple-choice' && (
          <div className="options">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                className={`option ${
                  currentQuestion.userAnswer === option
                    ? currentQuestion.isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => answerQuestion(currentQuiz.currentQuestionIndex, option)}
                disabled={!!currentQuestion.userAnswer}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuiz.type === 'flashcard' && (
          <div className="flashcard-container">
            <button
              className="flashcard"
              onClick={() => {
                const card = document.querySelector('.flashcard') as HTMLElement
                card?.classList.toggle('flipped')
              }}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">{currentQuestion.english}</div>
                <div className="flashcard-back">{currentQuestion.translation}</div>
              </div>
            </button>
            <div className="flashcard-options">
              <button
                className="option correct"
                onClick={() => {
                  answerQuestion(currentQuiz.currentQuestionIndex, currentQuestion.translation)
                  setTimeout(() => {
                    if (!isLastQuestion) nextQuestion()
                    else completeQuiz()
                  }, 300)
                }}
              >
                ✓ Got it right
              </button>
              <button
                className="option incorrect"
                onClick={() => {
                  answerQuestion(currentQuiz.currentQuestionIndex, 'wrong')
                  setTimeout(() => {
                    if (!isLastQuestion) nextQuestion()
                    else completeQuiz()
                  }, 300)
                }}
              >
                ✗ Need to review
              </button>
            </div>
          </div>
        )}

        {currentQuiz.type === 'typing' && (
          <div className="typing-container">
            <input
              type="text"
              placeholder="Type the translation..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  answerQuestion(currentQuiz.currentQuestionIndex, e.currentTarget.value)
                }
              }}
              disabled={!!currentQuestion.userAnswer}
              className="typing-input"
            />
            {currentQuestion.userAnswer && (
              <div className={`typing-result ${currentQuestion.isCorrect ? 'correct' : 'incorrect'}`}>
                {currentQuestion.isCorrect
                  ? '✓ Correct!'
                  : `✗ Correct answer: ${currentQuestion.translation}`}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="quiz-actions">
        {currentQuestion.userAnswer && (
          <button
            className="next-btn"
            onClick={() => {
              if (isLastQuestion) {
                completeQuiz()
              } else {
                nextQuestion()
              }
            }}
          >
            {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  )
}
