import React, { useState } from 'react'
import { useVocab } from '../store/vocabStore'
import Flashcard from './Flashcard'
import ProgressBar from './ProgressBar'

export default function StudyView() {
  const { state } = useVocab()
  const [index, setIndex] = useState(0)

  const words = state.words
  const current = words[index % Math.max(words.length, 1)]

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Study</h2>
        <ProgressBar value={index} total={Math.max(words.length, 1)} />
      </div>
      <div className="mt-4">
        {words.length === 0 ? (
          <div>No words. Add some.</div>
        ) : (
          <Flashcard key={current.id} word={current} onNext={() => setIndex(i => i + 1)} />
        )}
      </div>
    </div>
  )
}
