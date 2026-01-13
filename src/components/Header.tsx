import React from 'react'

export default function Header({ route, setRoute }: { route: string; setRoute: (r: any) => void }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Vocab Coach</h1>
        <p className="text-sm text-slate-400">Study words, take quizzes, and track progress</p>
      </div>
      <nav className="space-x-2">
        <button onClick={() => setRoute('study')} className={`px-3 py-1 rounded ${route === 'study' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          Study
        </button>
        <button onClick={() => setRoute('quiz')} className={`px-3 py-1 rounded ${route === 'quiz' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          Quiz
        </button>
        <button onClick={() => setRoute('review')} className={`px-3 py-1 rounded ${route === 'review' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          Review
        </button>
        <button onClick={() => setRoute('list')} className={`px-3 py-1 rounded ${route === 'list' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
          Word List
        </button>
      </nav>
    </header>
  )
}
