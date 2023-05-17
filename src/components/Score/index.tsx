import { useState } from 'react';
import { Counter } from '../Counter';

interface ScoreProps {
  points: number;
  songs: number;
  onEnd: () => void;
}

export const Score = ({ points, songs, onEnd }: ScoreProps) => {
  const [showPoints, setShowPoints] = useState(false);

  return (
    <div className="flex flex-col items-center leading-none">
      <div className="flex items-center gap-2 font-bold text-[#542163]">
        <div className="text-4xl">
          <Counter
            points={songs}
            time={500}
            step={1}
            onEnd={() => setShowPoints(true)}
          />
        </div>
        <div className="text-xs">
          songs
        </div>
      </div>
      {showPoints &&
        <div className="flex items-center gap-2 font-bold text-[#542163]">
          <div className="text-6xl">
            <Counter
              points={points}
              time={500}
              step={100}
              onEnd={onEnd}
            />
          </div>
          <div className="text-xs">
            points
          </div>
        </div>
      }
    </div>
  );
};
