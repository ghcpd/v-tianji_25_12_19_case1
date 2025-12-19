import React, { useState } from 'react';
import { useVocabulary } from '../VocabularyContext';

const Study = () => {
  const { state, dispatch } = useVocabulary();
  const [showTranslation, setShowTranslation] = useState(false);

  if (state.activeTab !== 'study') return null;

  const currentWord = state.words[state.currentIndex];

  const handleNext = () => {
    setShowTranslation(false);
    dispatch({ type: 'NEXT_WORD' });
  };

  const handleMarkLearned = () => {
    dispatch({ type: 'MARK_LEARNED', payload: currentWord.id });
    handleNext();
  };

  const handleMarkDifficult = () => {
    dispatch({ type: 'MARK_DIFFICULT', payload: currentWord.id });
    handleNext();
  };

  return (
    <div className="study">
      <h2>Study Flashcards</h2>
      <div className="flashcard">
        <div className="word">{currentWord.word}</div>
        {showTranslation && <div className="translation">{currentWord.translation}</div>}
        <button onClick={() => setShowTranslation(!showTranslation)}>
          {showTranslation ? 'Hide' : 'Show'} Translation
        </button>
      </div>
      <div className="actions">
        <button onClick={handleMarkLearned}>Mark as Learned</button>
        <button onClick={handleMarkDifficult}>Mark as Difficult</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Study;