import { useEffect, useRef, useState } from 'react';

export interface CounterProps {
  points: number;
  time: number;
  step: number;
  onEnd: () => void;
}

export const Counter = ({points, time, step, onEnd}: CounterProps) => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (currentPoints >= points) {
        clearInterval(intervalRef.current);
        onEnd();
      } else {
        setCurrentPoints((prevPoints) => prevPoints + step);
      }
    }, time / (points / step));

    return () => clearInterval(intervalRef.current);
  }, [currentPoints, points, time, step, onEnd]);

  return (
    <>
      {currentPoints}
    </>
  );
};