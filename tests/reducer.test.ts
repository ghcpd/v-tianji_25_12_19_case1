import { describe, it, expect } from 'vitest'
import { reducer, initialState } from '../src/store/vocabStore'

describe('vocab reducer', () => {
  it('marks a word difficult', () => {
    const id = initialState.words[0].id
    const s = reducer(initialState, { type: 'markDifficult', id })
    expect(s.words.find(w => w.id === id)?.difficult).toBe(true)
  })

  it('updates score', () => {
    const id = initialState.words[1].id
    const s = reducer(initialState, { type: 'updateScore', id, delta: 2 })
    expect(s.words.find(w => w.id === id)?.score).toBe(2)
  })

  it('enqueue and dequeue review', () => {
    const id = initialState.words[2].id
    const s1 = reducer(initialState, { type: 'enqueueReview', id })
    expect(s1.reviewQueue).toContain(id)
    const s2 = reducer(s1, { type: 'dequeueReview', id })
    expect(s2.reviewQueue).not.toContain(id)
  })
})
