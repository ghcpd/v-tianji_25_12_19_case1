# Vocabulary Learning Web App

A modern, interactive web application for learning vocabulary with word lists, quizzes, progress tracking, and review functionality.

## Features

- **Word Lists**: Study organized vocabulary lists with translations and pronunciations
- **Multiple Quiz Types**: 
  - Multiple Choice: Select the correct translation
  - Flashcard: Interactive flip cards for quick review
  - Typing: Test yourself by typing the translation
- **Progress Tracking**: Monitor your learning progress with detailed statistics
- **Review Queue**: Manage difficult words and words needing reinforcement
- **Difficulty Marking**: Mark words as difficult for focused practice
- **Performance Metrics**: Track accuracy, learning progress, and daily activity

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: React Context API
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS3 with responsive design

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── WordListView.tsx      # Display word lists
│   │   ├── QuizView.tsx          # Quiz interface
│   │   ├── ProgressView.tsx      # Progress statistics
│   │   ├── ReviewView.tsx        # Review queue
│   │   └── Navigation.tsx        # Navigation menu
│   ├── styles/
│   │   ├── App.css               # Global styles
│   │   ├── Navigation.css        # Navigation styling
│   │   ├── WordListView.css      # Word list styling
│   │   ├── QuizView.css          # Quiz styling
│   │   ├── ProgressView.css      # Progress styling
│   │   └── ReviewView.css        # Review styling
│   ├── __tests__/
│   │   ├── App.test.tsx          # App tests
│   │   ├── AppContext.test.tsx   # Context tests
│   │   ├── mockData.test.ts      # Utility tests
│   │   ├── WordListView.test.tsx # Word list tests
│   │   ├── QuizView.test.tsx     # Quiz tests
│   │   ├── ProgressView.test.tsx # Progress tests
│   │   ├── ReviewView.test.tsx   # Review tests
│   │   └── Navigation.test.tsx   # Navigation tests
│   ├── App.tsx                   # Root component
│   ├── AppContext.tsx            # Global state management
│   ├── main.tsx                  # Entry point
│   ├── types.ts                  # TypeScript types
│   └── mockData.ts               # Mock data and utilities
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
├── vitest.config.ts              # Vitest config
└── README.md                     # This file
```

## Installation

```bash
npm install
```

## Available Scripts

### Development Server
```bash
npm run dev
```
Starts the Vite development server at `http://localhost:3000`

### Build
```bash
npm run build
```
Creates a production-ready build in the `dist/` directory

### Run Tests
```bash
npm test
```
Runs all unit tests and displays coverage

### Watch Tests
```bash
npm run test:watch
```
Runs tests in watch mode for development

## Features in Detail

### Word Lists
- View organized vocabulary with English words and their translations
- See pronunciation guides for each word
- Track your progress on each word (correct attempts)
- Mark words as difficult for extra attention

### Quiz Types

**Multiple Choice**: Select the correct translation from 4 options
- Real-time feedback on selections
- Progress indicator showing quiz completion
- Score tracking

**Flashcard**: Interactive card flipping
- Click to reveal translations
- Mark words as mastered or needing review
- Immediate feedback

**Typing**: Type the correct answer
- Case-insensitive matching
- Immediate validation
- Shows correct answer if incorrect

### Progress Tracking
- **Learned Words**: Words with 3+ correct attempts
- **Accuracy**: Overall quiz performance percentage
- **Difficult Words**: Count of words marked as difficult
- **Daily Review**: Words studied today
- Visual progress bars for each metric

### Review Queue
- Automatically prioritizes difficult words
- Shows words needing reinforcement
- Organized by priority and attempt ratio
- Quick difficulty toggle for each word

## State Management

The app uses React Context API for global state management:

- `wordLists`: Array of vocabulary lists
- `currentListId`: Currently selected list
- `currentQuiz`: Active quiz session state

Context methods:
- `selectWordList()`: Change current word list
- `toggleWordDifficulty()`: Mark/unmark words as difficult
- `startQuiz()`: Initialize a new quiz session
- `answerQuestion()`: Record quiz answers
- `completeQuiz()`: Finish quiz and update stats
- `getProgressStats()`: Retrieve progress metrics
- `getReviewQueue()`: Get words needing review

## Testing

The project includes comprehensive unit tests:

- **Component Tests**: All UI components have test coverage
- **Context Tests**: State management thoroughly tested
- **Utility Tests**: Mock data utilities validated
- **User Interactions**: Button clicks, form inputs, navigation

Run tests with:
```bash
npm test
```

## Styling

The app features a modern, gradient-based design:

- **Color Scheme**: Purple/blue gradients (#667eea, #764ba2)
- **Responsive Layout**: Mobile-friendly design
- **Smooth Animations**: Transitions and hover effects
- **Accessible Colors**: Good contrast ratios
- **Emoji Icons**: Visual indicators throughout the UI

## Mock Data

The app comes with sample vocabulary lists:

1. **Common English Words**: Advanced vocabulary (Serendipity, Ephemeral, etc.)
2. **Business Vocabulary**: Professional terms (Stakeholder, Synergy, Leverage)

Each word includes:
- English term
- Translation/definition
- Pronunciation guide
- Practice statistics

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- User authentication and cloud sync
- Custom word list creation
- Audio pronunciation guides
- Spaced repetition algorithm
- Daily challenge quizzes
- Social features (leaderboards)
- Export/import word lists
- Dark mode theme
