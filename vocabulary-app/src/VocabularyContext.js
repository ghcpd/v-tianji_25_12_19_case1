import React, { createContext, useContext, useReducer } from 'react';
import { mockWords } from './data';

const VocabularyContext = createContext();

const initialState = {
  words: mockWords,
  currentIndex: 0,
  activeTab: 'study',
  quizMode: 'multiple-choice', // or 'typing'
  quizOptions: [],
  quizAnswer: '',
  progress: 0,
};

function vocabularyReducer(state, action) {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'MARK_LEARNED':
      const updatedWordsLearned = state.words.map(word =>
        word.id === action.payload ? { ...word, learned: true } : word
      );
      return {
        ...state,
        words: updatedWordsLearned,
        progress: updatedWordsLearned.filter(w => w.learned).length / updatedWordsLearned.length * 100,
      };
    case 'MARK_DIFFICULT':
      return {
        ...state,
        words: state.words.map(word =>
          word.id === action.payload ? { ...word, difficult: true } : word
        ),
      };
    case 'NEXT_WORD':
      return { ...state, currentIndex: (state.currentIndex + 1) % state.words.length };
    case 'SET_QUIZ_MODE':
      return { ...state, quizMode: action.payload };
    case 'START_QUIZ':
      const currentWord = state.words[state.currentIndex];
      const options = [currentWord.translation];
      while (options.length < 4) {
        const randomWord = state.words[Math.floor(Math.random() * state.words.length)].translation;
        if (!options.includes(randomWord)) options.push(randomWord);
      }
      return { ...state, quizOptions: options.sort(() => Math.random() - 0.5) };
    case 'ANSWER_QUIZ':
      if (action.payload === state.words[state.currentIndex].translation) {
        return vocabularyReducer(state, { type: 'MARK_LEARNED', payload: state.words[state.currentIndex].id });
      }
      return state;
    case 'RESET_QUIZ':
      return { ...state, quizOptions: [], quizAnswer: '' };
    default:
      return state;
  }
}

export const VocabularyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vocabularyReducer, initialState);

  return (
    <VocabularyContext.Provider value={{ state, dispatch }}>
      {children}
    </VocabularyContext.Provider>
  );
};

export const useVocabulary = () => useContext(VocabularyContext);