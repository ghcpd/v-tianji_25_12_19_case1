import { useVocab } from '../context/VocabContext'

export default function WordList() {
  const { words, progress, markDifficult } = useVocab()

  return (
    <div>
      <h2>Word List</h2>
      <ul>
        {words.map((w) => {
          const p = progress[w.id] ?? { attempts: 0, correct: 0, difficult: false }
          return (
            <li key={w.id} style={{ marginBottom: '1rem' }}>
              <strong>{w.term}</strong>: {w.definition}
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={p.difficult}
                    onChange={(e) => markDifficult(w.id, e.target.checked)}
                  />
                  Mark difficult
                </label>
                <div>
                  Attempts: {p.attempts}, Correct: {p.correct}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
