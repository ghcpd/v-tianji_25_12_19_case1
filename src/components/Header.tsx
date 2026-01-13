import React from 'react'
import { useStore } from '../state/store'

export default function Header() {
  const { state } = useStore()
  const total = state.lists.reduce((s, l) => s + l.words.length, 0)
  const learned = Object.keys(state.progress).length
  const difficult = state.difficult.size
  return (
    <header className="p-4 bg-white shadow-sm flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Vocabulary Learner</h1>
      <div className="flex gap-4 text-sm text-slate-600">
        <div>Words: {total}</div>
        <div>Learned: {learned}</div>
        <div>Review: {difficult}</div>
      </div>
    </header>
  )
}
