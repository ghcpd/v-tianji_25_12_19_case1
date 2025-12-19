import React from 'react'
import { useStore } from '../state/store'

export default function StudyList() {
  const { state, dispatch } = useStore()
  return (
    <div className="p-4 grid gap-4">
      {state.lists.map((list) => (
        <section key={list.id} className="bg-white rounded-md p-3 shadow-sm">
          <h2 className="font-medium mb-2">{list.title}</h2>
          <ul className="space-y-2">
            {list.words.map((w) => (
              <li key={w.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{w.term}</div>
                  <div className="text-sm text-slate-500">{w.meaning}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    aria-label={`toggle-difficult-${w.id}`}
                    onClick={() => dispatch({ type: 'toggle-difficult', wordId: w.id })}
                    className="px-2 py-1 rounded border text-xs"
                  >
                    {state.difficult.has(w.id) ? 'Marked' : 'Difficult'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
