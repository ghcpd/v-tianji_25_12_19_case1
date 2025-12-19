import React from 'react';
import { useVocabulary } from '../VocabularyContext';

const Progress = () => {
  const { state } = useVocabulary();

  if (state.activeTab !== 'progress') return null;

  const learnedCount = state.words.filter(word => word.learned).length;
  const total = state.words.length;

  return (
    <div className="progress">
      <h2>Progress</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${state.progress}%` }}></div>
      </div>
      <p>{learnedCount} / {total} words learned ({Math.round(state.progress)}%)</p>
      <ul>
        {state.words.filter(word => word.learned).map(word => (
          <li key={word.id}>{word.word} - {word.translation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;