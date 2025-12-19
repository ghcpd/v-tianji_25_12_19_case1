import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { VocabProvider } from './context/VocabContext'
import WordList from './components/WordList'
import Quiz from './components/Quiz'
import Progress from './components/Progress'
import './App.css'

function App() {
  return (
    <VocabProvider>
      <BrowserRouter>
        <div className="container">
          <nav>
            <ul>
              <li><Link to="/">Word List</Link></li>
              <li><Link to="/quiz">Quiz</Link></li>
              <li><Link to="/progress">Progress</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<WordList />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </BrowserRouter>
    </VocabProvider>
  )
}

export default App
