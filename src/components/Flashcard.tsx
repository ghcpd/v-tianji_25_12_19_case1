import React, { useState } from 'react'
import { useStore, findWordById } from '../state/store'

export default function Flashcard({ wordId }: { wordId: string }) {
  const { state, dispatch } = useStore()
  const word = findWordById(wordId)
  const [flipped, setFlipped] = useState(false)
  if (!word) return null
  return (
    <div className="p-4 bg-white rounded shadow-sm max-w-md">
      <div className="text-sm text-slate-500 mb-2">{word.term}</div>
      <div className="text-xl font-semibold mb-4">{flipped ? word.meaning : '—'}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setFlipped((s) => !s)}
          className="px-3 py-1 border rounded text-sm"
          aria-label="flip"
        >
          Flip
        </button>
        <button
          onClick={() => dispatch({ type: 'toggle-difficult', wordId })}
          className="px-3 py-1 border rounded text-sm"
          aria-label="toggle-difficult"
        >
          {state.difficult.has(wordId) ? 'Unmark Difficult' : 'Mark Difficult'}
        </button>
        <button
          onClick={() => dispatch({ type: 'mark-correct', wordId })}
          className="px-3 py-1 border rounded text-sm"
          aria-label="mark-correct"
        >
          Mark Correct
        </button>
      </div>
    </div>
  )
}
