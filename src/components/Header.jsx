import React from 'react'
import { useVocabulary } from '../store'

export default function Header() {
  const { state } = useVocabulary()
  const total = state.words.length
  const avg = Math.round(state.words.reduce((s, w) => s + w.progress, 0) / (total || 1))
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <div>
        <div style={{ fontWeight: 800 }}>Progress</div>
        <div style={{ marginTop: 8, width: 260 }}>
          <div className="progress" aria-hidden>
            <i style={{ width: `${avg}%` }} />
          </div>
          <div className="small-muted" style={{ marginTop: 8 }}>{avg}% average across {total} words</div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="badge">Review queue: {state.reviewQueue.length}</div>
        <div className="small-muted" style={{ marginTop: 8 }}>{state.session ? `In session: ${state.session.mode}` : 'No session'}</div>
      </div>
    </div>
  )
}
