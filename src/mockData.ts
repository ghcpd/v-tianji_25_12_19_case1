import { Word, WordList } from './types'

export const mockWordLists: WordList[] = [
  {
    id: '1',
    name: 'Common English Words',
    description: 'Essential vocabulary for everyday use',
    words: [
      {
        id: 'w1',
        english: 'Serendipity',
        translation: 'Finding something good by chance',
        pronunciation: 'ser-uh-nip-uh-tee',
        difficult: false,
        correctAttempts: 3,
        totalAttempts: 5
      },
      {
        id: 'w2',
        english: 'Ephemeral',
        translation: 'Lasting for a very short time',
        pronunciation: 'e-fem-er-uhl',
        difficult: false,
        correctAttempts: 2,
        totalAttempts: 4
      },
      {
        id: 'w3',
        english: 'Eloquent',
        translation: 'Fluent and expressive in speaking/writing',
        pronunciation: 'el-uh-kwuhnt',
        difficult: false,
        correctAttempts: 1,
        totalAttempts: 3
      },
      {
        id: 'w4',
        english: 'Melancholy',
        translation: 'A feeling of sadness and pensiveness',
        pronunciation: 'mel-uhn-kol-ee',
        difficult: true,
        correctAttempts: 0,
        totalAttempts: 2
      },
      {
        id: 'w5',
        english: 'Ubiquitous',
        translation: 'Present or found everywhere',
        pronunciation: 'yoo-bik-wi-tuhs',
        difficult: true,
        correctAttempts: 1,
        totalAttempts: 3
      },
      {
        id: 'w6',
        english: 'Perspicacious',
        translation: 'Having keen insight and understanding',
        pronunciation: 'pur-spi-kay-shuhs',
        difficult: true,
        correctAttempts: 0,
        totalAttempts: 1
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-19')
  },
  {
    id: '2',
    name: 'Business Vocabulary',
    description: 'Words used in professional settings',
    words: [
      {
        id: 'w7',
        english: 'Stakeholder',
        translation: 'A person with an interest or concern in something',
        difficult: false,
        correctAttempts: 5,
        totalAttempts: 6
      },
      {
        id: 'w8',
        english: 'Synergy',
        translation: 'The interaction of elements that produces a combined effect',
        difficult: false,
        correctAttempts: 3,
        totalAttempts: 4
      },
      {
        id: 'w9',
        english: 'Leverage',
        translation: 'Use something to maximum advantage',
        difficult: false,
        correctAttempts: 4,
        totalAttempts: 5
      }
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-19')
  }
]

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}

export const calculateAccuracy = (words: Word[]): number => {
  if (words.length === 0) return 0
  const totalAttempts = words.reduce((sum, w) => sum + w.totalAttempts, 0)
  if (totalAttempts === 0) return 0
  const correctAttempts = words.reduce((sum, w) => sum + w.correctAttempts, 0)
  return Math.round((correctAttempts / totalAttempts) * 100)
}

export const generateQuizOptions = (correctAnswer: string, allWords: Word[]): string[] => {
  const options = [correctAnswer]
  const otherWords = allWords
    .filter(w => w.translation !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(w => w.translation)

  return [...options, ...otherWords].sort(() => Math.random() - 0.5)
}
