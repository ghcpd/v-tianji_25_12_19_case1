import React from 'react';
import { useVocabulary } from '../VocabularyContext';

const Tabs = () => {
  const { state, dispatch } = useVocabulary();

  const tabs = ['study', 'quiz', 'progress', 'review'];

  return (
    <nav className="tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={state.activeTab === tab ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_TAB', payload: tab })}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;