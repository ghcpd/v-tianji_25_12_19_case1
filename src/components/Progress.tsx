import React from 'react'
import { useStore } from '../state/store'

export default function Progress() {
  const { state } = useStore()
  const total = state.lists.reduce((s, l) => s + l.words.length, 0)
  const learnedCount = Object.keys(state.progress).reduce((s, id) => s + (state.progress[id] >= 1 ? 1 : 0), 0)
  const pct = Math.round((learnedCount / total) * 100)
  return (
    <div className="p-4 bg-white rounded shadow-sm max-w-md">
      <div className="text-sm text-slate-500 mb-2">Overall progress</div>
      <div className="w-full bg-slate-200 rounded h-3 overflow-hidden">
        <div className="bg-emerald-400 h-3" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-sm text-slate-600 mt-2">{learnedCount}/{total} ({pct}%)</div>
    </div>
  )
}
