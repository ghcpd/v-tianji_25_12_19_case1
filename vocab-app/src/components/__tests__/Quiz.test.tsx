import { render, screen, fireEvent } from '@testing-library/react'
import { VocabProvider } from '../../context/VocabContext'
import Quiz from '../Quiz'
import { mockVocab } from '../../data/mockVocab'
import { vi } from 'vitest'

describe('Quiz', () => {
  test('shows a question and moves to a new question after answering', () => {
    // deterministic random values: first pick indices 0,1,2,3 for options, next pick 4,5,6,7
    const randomSpy = vi.spyOn(Math, 'random')
    randomSpy.mockImplementationOnce(() => 0) // pick index 0 (first word)
      .mockImplementationOnce(() => 0.1)
      .mockImplementationOnce(() => 0.2)
      .mockImplementationOnce(() => 0.3)
      .mockImplementationOnce(() => 0.4) // next pick index 4
      .mockImplementationOnce(() => 0.5)
      .mockImplementationOnce(() => 0.6)
      .mockImplementationOnce(() => 0.7)

    render(
      <VocabProvider>
        <Quiz />
      </VocabProvider>
    )

    const firstTermElem = screen.getByText(/What is the definition of:/)
    expect(firstTermElem).toBeInTheDocument()
    const firstTerm = firstTermElem.textContent

    const correctDef = mockVocab[0].definition
    const correctButton = screen.getByRole('button', { name: correctDef })

    fireEvent.click(correctButton)

    const secondTermElem = screen.getByText(/What is the definition of:/)
    expect(secondTermElem).toBeInTheDocument()
    const secondTerm = secondTermElem.textContent
    expect(secondTerm).not.toEqual(firstTerm)

    randomSpy.mockRestore()
  })
})
