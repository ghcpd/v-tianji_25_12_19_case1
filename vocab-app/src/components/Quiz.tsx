import { useState, useEffect } from 'react'
import { useVocab } from '../context/VocabContext'
import type { VocabWord } from '../data/mockVocab'

export default function Quiz() {
  const { words, recordAnswer } = useVocab()

  const [current, setCurrent] = useState<VocabWord | null>(null)
  const [options, setOptions] = useState<string[]>([])

  // pick a random word and create options
  const pick = () => {
    const next = words[Math.floor(Math.random() * words.length)]
    const defs = new Set<string>()
    defs.add(next.definition)
    while (defs.size < 4) {
      const rand = words[Math.floor(Math.random() * words.length)]
      defs.add(rand.definition)
    }
    setCurrent(next)
    setOptions(Array.from(defs).sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    if (words.length) pick()
  }, [words])

  if (!current) return <div>Loading...</div>

  const handleAnswer = (def: string) => {
    const correct = def === current.definition
    recordAnswer(current.id, correct)
    pick()
  }

  return (
    <div>
      <h2>Quiz</h2>
      <div>
        <strong>What is the definition of: {current.term}</strong>
      </div>
      <ul>
        {options.map((def) => (
          <li key={def} style={{ marginBottom: '0.5rem' }}>
            <button onClick={() => handleAnswer(def)}>{def}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
