import React from 'react';
import { VocabularyProvider } from './VocabularyContext';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Study from './components/Study';
import Quiz from './components/Quiz';
import Progress from './components/Progress';
import Review from './components/Review';
import './App.css';

function App() {
  return (
    <VocabularyProvider>
      <div className="App">
        <Header />
        <Tabs />
        <main>
          <Study />
          <Quiz />
          <Progress />
          <Review />
        </main>
      </div>
    </VocabularyProvider>
  );
}

export default App;
