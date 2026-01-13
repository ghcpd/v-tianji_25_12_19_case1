import React from 'react'
import { useStore, findWordById } from '../state/store'

export default function Review() {
  const { state, dispatch } = useStore()
  const words = Array.from(state.difficult).map((id) => findWordById(id)).filter(Boolean)
  if (words.length === 0) return <div className="p-4 text-slate-600">No difficult words</div>
  return (
    <div className="p-4 grid gap-2 bg-white rounded shadow-sm max-w-md">
      <h3 className="font-medium">Review queue</h3>
      {words.map((w) => (
        <div key={w!.id} className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{w!.term}</div>
            <div className="text-sm text-slate-500">{w!.meaning}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => dispatch({ type: 'toggle-difficult', wordId: w!.id })} className="px-2 py-1 border rounded text-sm">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
