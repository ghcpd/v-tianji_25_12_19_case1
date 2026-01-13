import React from 'react'
import { useVocabulary } from '../store'

function WordItem({ w, onToggle }) {
  return (
    <div className="word" data-testid={`word-${w.id}`}>
      <div>
        <div style={{ fontWeight: 800 }}>{w.term}</div>
        <div className="meta">{w.meaning}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        <div className="small">{w.progress}%</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={`btn ${w.difficult ? 'primary' : ''}`} onClick={() => onToggle(w.id)} data-testid={`toggle-${w.id}`}>{w.difficult ? 'Difficult' : 'Mark'}</button>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { state, toggleDifficult, startSession } = useVocabulary()
  return (
    <div>
      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800 }}>Word Lists</div>
          <div className="small-muted">{state.words.length} words</div>
        </div>
        <div className="list">
          {state.words.map(w => <WordItem key={w.id} w={w} onToggle={toggleDifficult} />)}
        </div>
        <div className="footer" style={{ marginTop: 12 }}>
          <div className="small-muted">Quick actions</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={() => startSession('flash')}>Study All</button>
            <button className="btn" onClick={() => startSession('quiz')}>Quiz All</button>
            <button className="btn" onClick={() => startSession('quiz', state.reviewQueue)} disabled={!state.reviewQueue.length}>Quiz Difficult</button>
          </div>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800 }}>Review Queue</div>
          <div className="small-muted">{state.reviewQueue.length}</div>
        </div>
        <div style={{ marginTop: 10 }}>
          {state.reviewQueue.length ? (
            <div className="list">
              {state.reviewQueue.map(id => {
                const w = state.words.find(x => x.id === id)
                return <div key={id} className="word"><div><div style={{ fontWeight: 700 }}>{w.term}</div><div className="meta">{w.meaning}</div></div><div className="small">{w.progress}%</div></div>
              })}
            </div>
          ) : (
            <div className="empty">No difficult words yet — mark ones you find tricky to review later.</div>
          )}
        </div>
      </div>
    </div>
  )
}
