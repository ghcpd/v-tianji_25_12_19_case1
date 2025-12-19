import React, { useState, useEffect } from 'react';
import { useVocabulary } from '../VocabularyContext';

const Quiz = () => {
  const { state, dispatch } = useVocabulary();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (state.activeTab === 'quiz' && state.quizMode === 'multiple-choice') {
      dispatch({ type: 'START_QUIZ' });
    }
  }, [state.activeTab, state.quizMode, dispatch]);

  if (state.activeTab !== 'quiz') return null;

  const currentWord = state.words[state.currentIndex];

  const handleSubmit = () => {
    const answer = state.quizMode === 'multiple-choice' ? selectedAnswer : typedAnswer;
    if (answer === currentWord.translation) {
      setFeedback('Correct!');
      dispatch({ type: 'ANSWER_QUIZ', payload: answer });
    } else {
      setFeedback('Incorrect. Try again.');
    }
    setTimeout(() => {
      setFeedback('');
      setSelectedAnswer('');
      setTypedAnswer('');
      dispatch({ type: 'NEXT_WORD' });
      dispatch({ type: 'RESET_QUIZ' });
    }, 2000);
  };

  return (
    <div className="quiz">
      <h2>Quiz</h2>
      <div>
        <label>
          <input
            type="radio"
            value="multiple-choice"
            checked={state.quizMode === 'multiple-choice'}
            onChange={() => dispatch({ type: 'SET_QUIZ_MODE', payload: 'multiple-choice' })}
          />
          Multiple Choice
        </label>
        <label>
          <input
            type="radio"
            value="typing"
            checked={state.quizMode === 'typing'}
            onChange={() => dispatch({ type: 'SET_QUIZ_MODE', payload: 'typing' })}
          />
          Typing
        </label>
      </div>
      <div className="question">
        <p>What is the translation of "{currentWord.word}"?</p>
        {state.quizMode === 'multiple-choice' ? (
          <div>
            {state.quizOptions.map(option => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            placeholder="Type the translation"
          />
        )}
      </div>
      <button onClick={handleSubmit} disabled={!selectedAnswer && !typedAnswer}>Submit</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Quiz;