import { useVocab } from '../context/VocabContext'

export default function Progress() {
  const { words, progress } = useVocab()

  const totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.attempts, 0)
  const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0)
  const accuracy = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  const difficultWords = words.filter((w) => progress[w.id]?.difficult)

  return (
    <div>
      <h2>Progress</h2>
      <div>Total words: {words.length}</div>
      <div>Total attempts: {totalAttempts}</div>
      <div>Total correct: {totalCorrect}</div>
      <div>Accuracy: {accuracy}%</div>

      <h3>Difficult words</h3>
      {difficultWords.length ? (
        <ul>
          {difficultWords.map((w) => {
            const p = progress[w.id]
            return (
              <li key={w.id}>
                <strong>{w.term}</strong> (Attempts: {p?.attempts ?? 0}, Correct: {p?.correct ?? 0})
              </li>
            )
          })}
        </ul>
      ) : (
        <div>No difficult words</div>
      )}
    </div>
  )
}
