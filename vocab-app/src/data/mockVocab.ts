export interface VocabWord {
  id: number;
  term: string;
  definition: string;
}

export const mockVocab: VocabWord[] = [
  { id: 1, term: 'aberration', definition: 'a departure from what is normal, usual, or expected' },
  { id: 2, term: 'cacophony', definition: 'a harsh, discordant mixture of sounds' },
  { id: 3, term: 'debilitate', definition: 'to make someone weak or infirm' },
  { id: 4, term: 'elucidate', definition: 'make (something) clear; explain' },
  { id: 5, term: 'facetious', definition: 'treating serious issues with deliberately inappropriate humor' },
  { id: 6, term: 'gare', definition: 'to hinder or obstruct (rarely used)' },
  { id: 7, term: 'harangue', definition: 'a lengthy and aggressive speech' },
  { id: 8, term: 'inimical', definition: 'tending to obstruct or harm' },
  { id: 9, term: 'juxtapose', definition: 'place or deal with close together for contrasting effect' },
  { id: 10, term: 'karma', definition: 'the consequence of a person’s actions' },
];
