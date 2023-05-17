import { AttemptStatus } from "../../interfaces";

export const event = (eventName: string, data?: any) => {
  gtag('event', eventName, data);
};

export const startGame = () => {
  event('Start game');
};

export const endGame = () => {
  event('End game');
};

export const sendWord = (word: string, status: AttemptStatus) => {
  event('Word', {
    word,
    status: status.toLowerCase(),
  });
};

export const playAgain = () => {
  event('Play again');
};
