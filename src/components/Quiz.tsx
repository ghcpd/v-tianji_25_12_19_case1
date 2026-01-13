import React, { useMemo, useState } from 'react'
import { useStore } from '../state/store'

function shuffle<T>(arr: T[]) {
  return arr.slice().sort(() => Math.random() - 0.5)
}

export default function Quiz() {
  const { state, dispatch } = useStore()
  const pool = state.lists.flatMap((l) => l.words)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)

  const question = useMemo(() => shuffle(pool)[index % pool.length], [pool, index])
  if (!question) return <div>No words</div>

  const options = useMemo(() => {
    const others = shuffle(pool.filter((p) => p.id !== question.id)).slice(0, 3)
    return shuffle([question, ...others])
  }, [question, pool])

  function choose(optId: string) {
    if (optId === question.id) {
      setScore((s) => s + 1)
      dispatch({ type: 'mark-correct', wordId: question.id })
    }
    setIndex((i) => i + 1)
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm max-w-lg">
      <div className="text-sm text-slate-500">What is the meaning of <strong>{question.term}</strong>?</div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {options.map((o) => (
          <button key={o.id} onClick={() => choose(o.id)} className="p-2 border rounded text-left">
            {o.meaning}
          </button>
        ))}
      </div>
      <div className="mt-3 text-sm text-slate-600">Score: {score}</div>
    </div>
  )
}
