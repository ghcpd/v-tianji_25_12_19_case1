import React from 'react'
import { useVocab } from '../store/vocabStore'

export default function WordList() {
  const { state, dispatch } = useVocab()

  return (
    <div className="card">
      <h2 className="text-xl mb-4">Word List</h2>
      <ul className="space-y-3">
        {state.words.map(w => (
          <li key={w.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{w.term}</div>
              <div className="text-sm text-slate-400">{w.meaning}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label={`toggle-difficult-${w.id}`}
                onClick={() => dispatch({ type: 'markDifficult', id: w.id })}
                className={`px-2 py-1 rounded ${w.difficult ? 'bg-red-600' : 'bg-slate-700'}`}>
                {w.difficult ? 'Difficult' : 'Mark'}
              </button>
              <button
                aria-label={`remove-${w.id}`}
                onClick={() => dispatch({ type: 'removeWord', id: w.id })}
                className="px-2 py-1 rounded bg-slate-700">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
