import { useEffect, useState } from 'react';

export interface CounterProps {
  points: number;
  time: number;
  step: number;
  onEnd: () => void;
}

export const Counter = ({points, time, step, onEnd}: CounterProps) => {
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    console.log('Score useEffect');
    const intervalId = setInterval(() => {
      if (currentPoints >= points) {
        clearInterval(intervalId);
        onEnd();
      } else {
        setCurrentPoints((prevPoints) => prevPoints + step);
      }
    }, time / (points / step));

    return () => clearInterval(intervalId);
  }, [currentPoints, points, time, step, onEnd]);

  return (
    <>
      {currentPoints}
    </>
  );
};