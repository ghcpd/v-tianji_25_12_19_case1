import React from 'react'
import { useVocab } from '../store/vocabStore'

export default function ReviewView() {
  const { state, dispatch } = useVocab()
  const items = state.reviewQueue.map(id => state.words.find(w => w.id === id)!).filter(Boolean)

  return (
    <div className="card">
      <h2 className="text-xl mb-4">Review Queue ({items.length})</h2>
      <ul className="space-y-3">
        {items.map(w => (
          <li key={w.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{w.term}</div>
              <div className="text-sm text-slate-400">{w.meaning}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => dispatch({ type: 'dequeueReview', id: w.id })} className="px-3 py-1 rounded bg-green-600">Mark Reviewed</button>
              <button onClick={() => dispatch({ type: 'removeWord', id: w.id })} className="px-3 py-1 rounded bg-red-600">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
