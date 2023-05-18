export enum AttemptStatus {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
  REPEATED = 'REPEATED',
};

export enum GameStatus {
  INITIAL = 'INITIAL',
  COUNTDOWN = 'COUNTDOWN',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
};

export interface Attempt {
  id: string;
  word: string;
  correct?: string;
  status: AttemptStatus;
  points: number;
};

export interface HighScore {
  bestPoints: number;
  bestSongs: number;
  maxCorrect: number;
  totalGames: number;
};
