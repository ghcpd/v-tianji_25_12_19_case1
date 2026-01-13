import React, { useState } from 'react'
import { Word } from '../types'
import { useVocab } from '../store/vocabStore'

export default function Flashcard({ word, onNext }: { word: Word; onNext: () => void }) {
  const [show, setShow] = useState(false)
  const { dispatch } = useVocab()

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold">{word.term}</div>
      <div className="mt-2 text-slate-400">{show ? word.meaning : 'Tap to reveal'}</div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => setShow(s => !s)} className="px-3 py-1 rounded bg-indigo-600">
          {show ? 'Hide' : 'Reveal'}
        </button>
        <button
          onClick={() => {
            dispatch({ type: 'updateScore', id: word.id, delta: 1 })
            onNext()
          }}
          className="px-3 py-1 rounded bg-green-600">
          I knew it
        </button>
        <button
          onClick={() => {
            dispatch({ type: 'updateScore', id: word.id, delta: -1 })
            dispatch({ type: 'enqueueReview', id: word.id })
            onNext()
          }}
          className="px-3 py-1 rounded bg-red-600">
          I didn't know
        </button>
      </div>
    </div>
  )
}
