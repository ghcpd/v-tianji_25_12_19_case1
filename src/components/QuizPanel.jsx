import React, { useMemo, useState } from 'react'
import { useVocabulary } from '../store'

function shuffle(arr){ return arr.slice().sort(()=>Math.random()-0.5) }

export default function QuizPanel(){
  const { state, answerQuiz, nextCard } = useVocabulary()
  const session = state.session
  if(!session) return null
  const id = session.queue[session.index]
  const word = state.words.find(w=>w.id===id)
  const [mode, setMode] = useState('mc') // 'mc' or 'type'
  const [typed, setTyped] = useState('')
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const choices = useMemo(()=>{
    const others = state.words.filter(w=>w.id!==id).map(w=>w.meaning)
    const picks = shuffle(others).slice(0,3)
    return shuffle([word.meaning, ...picks])
  }, [id, state.words])

  const submitMC = choice => {
    const correct = choice === word.meaning
    setSelected(choice)
    setFeedback(correct ? 'correct' : 'wrong')
    answerQuiz(correct)
    setTimeout(()=>{ setSelected(null); setFeedback(null); setTyped(''); nextCard() }, 700)
  }

  const submitType = () => {
    const correct = typed.trim().toLowerCase() === word.term.toLowerCase()
    setFeedback(correct ? 'correct' : 'wrong')
    answerQuiz(correct)
    setTimeout(()=>{ setSelected(null); setFeedback(null); setTyped(''); nextCard() }, 700)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Quiz — {mode === 'mc' ? 'Multiple choice' : 'Type the word'}</div>
          <div className="small-muted" style={{ marginTop: 6 }}>{session.index + 1} of {session.queue.length} — correct {session.correct} / {session.attempted}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={`btn ${mode==='mc'?'primary':''}`} onClick={()=>setMode('mc')}>MC</button>
          <button className={`btn ${mode==='type'?'primary':''}`} onClick={()=>setMode('type')}>Type</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {mode === 'mc' ? (
          <div>
            <div className="hint">Meaning:</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 8 }}>{word.meaning}</div>
            <div style={{ marginTop: 12 }} className="choices">
              {choices.map(c => (
                <div key={c} role="button" className={`choice ${selected===c && feedback==='correct' ? 'correct' : ''} ${selected===c && feedback==='wrong' ? 'wrong' : ''}`} onClick={()=>submitMC(c)} data-testid={`choice-${c.substring(0,6)}`}>{c}</div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="hint">Meaning: <span style={{ fontWeight: 700 }}>{word.meaning}</span></div>
            <div style={{ marginTop: 10 }}>
              <input className="input" value={typed} onChange={e=>setTyped(e.target.value)} placeholder="Type the exact word" data-testid="type-input" />
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button className="btn primary" onClick={submitType} data-testid="submit-type">Submit</button>
              <div className="small-muted">Hint: case-insensitive match</div>
            </div>
            <div style={{ marginTop: 8 }} className="small-muted">{feedback === 'correct' ? 'Correct — nice!' : feedback === 'wrong' ? 'Incorrect — word will still count as attempted' : ''}</div>
          </div>
        )}
      </div>
    </div>
  )
}
