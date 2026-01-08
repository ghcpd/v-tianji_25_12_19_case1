import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders vocabulary app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Vocabulary Learning App/i);
  expect(headerElement).toBeInTheDocument();
});

test('switches to study tab', () => {
  render(<App />);
  const studyTab = screen.getByRole('button', { name: /Study/i });
  fireEvent.click(studyTab);
  expect(screen.getByText(/Study Flashcards/i)).toBeInTheDocument();
});

test('switches to quiz tab', () => {
  render(<App />);
  const quizTab = screen.getByRole('button', { name: /Quiz/i });
  fireEvent.click(quizTab);
  expect(screen.getByText(/What is the translation/i)).toBeInTheDocument();
});

test('switches to progress tab', () => {
  render(<App />);
  const progressTab = screen.getByRole('button', { name: /Progress/i });
  fireEvent.click(progressTab);
  expect(screen.getByText(/words learned/i)).toBeInTheDocument();
});

test('switches to review tab', () => {
  render(<App />);
  const reviewTab = screen.getByRole('button', { name: /Review/i });
  fireEvent.click(reviewTab);
  expect(screen.getByText(/Review Difficult Words/i)).toBeInTheDocument();
});
