import React, { useState } from 'react'
import { useVocab } from '../store/vocabStore'
import { QuizMode } from '../types'

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function QuizView() {
  const { state, dispatch } = useVocab()
  const [mode, setMode] = useState<QuizMode>('multiple')
  const [index, setIndex] = useState(0)

  const words = shuffle(state.words)
  const current = words[index % Math.max(words.length, 1)]

  // Build a unique options set (avoid duplicates including the current word)
  const optionCandidates = shuffle(words.filter(w => w.id !== current.id))
  const options = shuffle([current, ...optionCandidates.slice(0, 3)]).slice(0, 4)

  function handleMultiple(choiceId: string) {
    if (choiceId === current.id) {
      dispatch({ type: 'updateScore', id: current.id, delta: 1 })
    } else {
      dispatch({ type: 'updateScore', id: current.id, delta: -1 })
      dispatch({ type: 'enqueueReview', id: current.id })
    }
    setIndex(i => i + 1)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Quiz</h2>
        <div className="space-x-2">
          <button onClick={() => setMode('multiple')} className={`px-2 py-1 rounded ${mode === 'multiple' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
            Multiple
          </button>
          <button onClick={() => setMode('typing')} className={`px-2 py-1 rounded ${mode === 'typing' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
            Typing
          </button>
        </div>
      </div>

      <div className="mt-4">
        {mode === 'multiple' ? (
          <div>
            <div className="text-lg font-semibold">Select the correct meaning for <span className="italic">{current.term}</span></div>
            <ul className="mt-3 space-y-2">
              {options.map(o => (
                <li key={o.id}>
                  <button onClick={() => handleMultiple(o.id)} className="w-full text-left p-2 rounded bg-slate-700">
                    {o.meaning}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <TypingQuiz current={current} onCorrect={() => { dispatch({ type: 'updateScore', id: current.id, delta: 1 }); setIndex(i => i + 1) }} onWrong={() => { dispatch({ type: 'updateScore', id: current.id, delta: -1 }); dispatch({ type: 'enqueueReview', id: current.id }); setIndex(i => i + 1) }} />
        )}
      </div>
    </div>
  )
}

function TypingQuiz({ current, onCorrect, onWrong }: any) {
  const [input, setInput] = useState('')
  function submit() {
    if (input.trim().toLowerCase() === current.meaning.trim().toLowerCase()) onCorrect()
    else onWrong()
    setInput('')
  }
  return (
    <div>
      <div className="text-lg font-semibold">Describe: <span className="italic">{current.term}</span></div>
      <div className="mt-2 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 rounded bg-slate-800" />
        <button onClick={submit} className="px-3 py-1 rounded bg-indigo-600">Check</button>
      </div>
    </div>
  )
}
