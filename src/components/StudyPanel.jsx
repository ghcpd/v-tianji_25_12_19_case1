import React, { useState } from 'react'
import { useVocabulary } from '../store'

export default function StudyPanel() {
  const { state, nextCard, recordStudy, toggleDifficult } = useVocabulary()
  const session = state.session
  if (!session) return null
  const id = session.queue[session.index]
  const word = state.words.find(w => w.id === id)
  const [reveal, setReveal] = useState(false)

  const onKnow = () => {
    recordStudy(word.id)
    setReveal(false)
    nextCard()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{session.mode === 'flash' ? 'Flashcard' : 'Study'}</div>
          <div className="small-muted" style={{ marginTop: 6 }}>{session.index + 1} of {session.queue.length}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="badge">{word.progress}%</div>
          <div style={{ marginTop: 8 }}>
            <button className={`btn ${word.difficult ? 'primary' : ''}`} onClick={() => toggleDifficult(word.id)} data-testid={`toggle-d-${word.id}`}>{word.difficult ? 'Difficult' : 'Mark'}</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="flashcard" onClick={() => setReveal(r => !r)} data-testid="flashcard">
          {reveal ? (<div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{word.term}</div>
            <div className="small-muted" style={{ marginTop: 8 }}>{word.meaning}</div>
            <div className="hint" style={{ marginTop: 10, fontWeight: 600 }}>{word.example}</div>
          </div>) : (
            <div style={{ color: 'var(--muted)' }}>
              Tap to reveal meaning
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => { setReveal(true) }}>Reveal</button>
          <button className="btn primary" onClick={onKnow} data-testid="know-btn">I know this</button>
          <button className="btn" onClick={() => { toggleDifficult(word.id) }}>{word.difficult ? 'Unmark' : 'Mark difficult'}</button>
        </div>

        <div className="hint">Tip: click the card to toggle details. Known words increase progress faster.</div>
      </div>
    </div>
  )
}
