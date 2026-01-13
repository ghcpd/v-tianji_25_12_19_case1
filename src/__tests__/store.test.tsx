import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { StoreProvider, useStore } from '../state/store'
import { render } from '@testing-library/react'

function wrapper({ children }: any) {
  return <StoreProvider>{children}</StoreProvider>
}

test('toggle difficult toggles a word', () => {
  const { result } = renderHook(() => useStore(), { wrapper })
  act(() => result.current.dispatch({ type: 'toggle-difficult', wordId: 'w1' }))
  expect(result.current.state.difficult.has('w1')).toBe(true)
  act(() => result.current.dispatch({ type: 'toggle-difficult', wordId: 'w1' }))
  expect(result.current.state.difficult.has('w1')).toBe(false)
})

test('mark correct increases progress', () => {
  const { result } = renderHook(() => useStore(), { wrapper })
  act(() => result.current.dispatch({ type: 'mark-correct', wordId: 'w1' }))
  expect(result.current.state.progress['w1']).toBe(1)
  act(() => result.current.dispatch({ type: 'mark-correct', wordId: 'w1' }))
  expect(result.current.state.progress['w1']).toBe(2)
})
