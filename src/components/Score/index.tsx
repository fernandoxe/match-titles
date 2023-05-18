import { useEffect, useState } from 'react';
import { Counter } from '../Counter';
import { useTranslation } from 'react-i18next';
import { Attempt, AttemptStatus, HighScore } from '../../interfaces';

interface ScoreProps {
  attempts: Attempt[];
  onEnd: () => void;
}

export const Score = ({ attempts, onEnd }: ScoreProps) => {
  const { t } = useTranslation();
  const [showPoints, setShowPoints] = useState(false);
  const [points, setPoints] = useState(0);
  const [songs, setSongs] = useState(0);

  useEffect(() => {
    const points = attempts.reduce((acc, attempt) => acc + attempt.points, 0);
    setPoints(points);
    const correct = attempts.filter(attempt => attempt.status === AttemptStatus.CORRECT).length;
    setSongs(correct);
    const highScores = localStorage.getItem('highScores') || '{}';
    const highScoresParsed: HighScore = JSON.parse(highScores);
    const isBestGame = points >= (highScoresParsed.bestPoints || 0);
    const newHighscores = {
      ...highScoresParsed,
      maxCorrect: Math.max(highScoresParsed.maxCorrect || 0, correct),
      totalGames: (highScoresParsed.totalGames || 0) + 1,
    };
    if(isBestGame) {
      newHighscores.bestPoints = points;
      newHighscores.bestSongs = correct;
    }
    localStorage.setItem('highScores', JSON.stringify(newHighscores));
  }, [attempts]);

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
          {t('score.songs', {count: songs})}
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
            {t('score.points')}
          </div>
        </div>
      }
    </div>
  );
};
