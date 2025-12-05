export interface Question {
  id: string;
  text: string;
  source: 'builtin' | 'custom';
  isFavorite: boolean;
}

export interface CardProps {
  question: Question | null;
  isFlipped: boolean;
  onFlip: () => void;
}