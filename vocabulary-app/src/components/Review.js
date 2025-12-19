import React from 'react';
import { useVocabulary } from '../VocabularyContext';

const Review = () => {
  const { state } = useVocabulary();

  if (state.activeTab !== 'review') return null;

  const difficultWords = state.words.filter(word => word.difficult);

  return (
    <div className="review">
      <h2>Review Difficult Words</h2>
      {difficultWords.length === 0 ? (
        <p>No difficult words yet.</p>
      ) : (
        <ul>
          {difficultWords.map(word => (
            <li key={word.id}>
              <strong>{word.word}</strong> - {word.translation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;