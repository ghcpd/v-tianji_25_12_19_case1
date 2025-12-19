import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { VocabProvider, useVocab } from '../../context/VocabContext'
import Progress from '../Progress'

function Init({ children }: { children: React.ReactNode }) {
  const { markDifficult, recordAnswer } = useVocab()
  useEffect(() => {
    // mark word id 1 difficult and record some answers
    markDifficult(1, true)
    recordAnswer(1, true)
    recordAnswer(1, false)
    recordAnswer(2, true)
  }, [])
  return <>{children}</>
}

describe('Progress', () => {
  test('renders totals and difficult words', () => {
    render(
      <VocabProvider>
        <Init>
          <Progress />
        </Init>
      </VocabProvider>
    )

    expect(screen.getByText(/Total words:/)).toBeInTheDocument()
    expect(screen.getByText(/Total attempts: 3/)).toBeInTheDocument()
    expect(screen.getByText(/Total correct: 2/)).toBeInTheDocument()
    // should list the difficult word (id 1)
    expect(screen.getByText('aberration')).toBeInTheDocument()
  })
})
