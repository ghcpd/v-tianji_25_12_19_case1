import { render, screen, fireEvent } from '@testing-library/react'
import { VocabProvider } from '../../context/VocabContext'
import WordList from '../WordList'

describe('WordList', () => {
  test('renders list of words and toggles difficult flag', () => {
    render(
      <VocabProvider>
        <WordList />
      </VocabProvider>
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(10)

    // find first checkbox and toggle
    const firstCheckbox = screen.getAllByRole('checkbox')[0]
    expect(firstCheckbox).not.toBeChecked()
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
  })
})
