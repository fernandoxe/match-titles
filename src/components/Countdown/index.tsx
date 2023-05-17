import { useState, useRef, useEffect } from 'react';

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export interface CountdownProps {
  seconds: number;
  format?: boolean;
  first?: boolean;
  lastWord?: string | null;
  onEnd: () => void;
};

export const Countdown = ({seconds, format, first, lastWord, onEnd}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(first ? 1 : seconds - 1);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeLeft === (first ? (seconds + 1) : -1)) {
      onEnd();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => prev + (first ? 1 : -1));
    }, first ? 700 : 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timeLeft, first, seconds, onEnd]);

  return (
    <>
      {first &&
        <>
          {timeLeft < seconds &&
            <div>
              {format ? formatTime(timeLeft) : timeLeft}
            </div>
          }
          {timeLeft === seconds && lastWord &&
            <div className="text-4xl">
              {lastWord}
            </div>
          }
        </>
      }
      {!first &&
        <>
          {timeLeft >= 0 &&
            <div className={`${timeLeft <= 5 ? 'text-red-700 animate-vibrate': ''}`}>
              {format ? formatTime(timeLeft) : timeLeft}
            </div>
          }
        </>
      }
    </>
  );
};
