export type Word = {
  id: string
  term: string
  meaning: string
}

export type WordList = {
  id: string
  title: string
  words: Word[]
}

export const sampleLists: WordList[] = [
  {
    id: 'list-1',
    title: 'Basic Spanish',
    words: [
      { id: 'w1', term: 'hola', meaning: 'hello' },
      { id: 'w2', term: 'adiós', meaning: 'goodbye' },
      { id: 'w3', term: 'gracias', meaning: 'thank you' },
      { id: 'w4', term: 'por favor', meaning: 'please' },
    ],
  },
  {
    id: 'list-2',
    title: 'Food',
    words: [
      { id: 'w5', term: 'pan', meaning: 'bread' },
      { id: 'w6', term: 'agua', meaning: 'water' },
      { id: 'w7', term: 'queso', meaning: 'cheese' },
    ],
  },
]
