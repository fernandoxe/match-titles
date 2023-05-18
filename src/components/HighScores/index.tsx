import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { HighScore } from "../../interfaces";
import { useTranslation } from "react-i18next";

export interface HighScoresProps {
  onClose: () => void;
};

export const HightScores = ({onClose}: HighScoresProps) => {
  const { t } = useTranslation();
  const [highScores, setHighScores] = useState<HighScore>();

  useEffect(() => {
    const highScores = localStorage.getItem('highScores');
    if(highScores) {
      setHighScores(JSON.parse(highScores));
    }
  }, []);

  return (
    <Modal
      title={t('high_scores.title')}
      onClose={onClose}
    >
      {!highScores &&
        <div>
          {t('high_scores.no_scores')}
        </div>
      }
      {highScores &&
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col">
            <div>
              {t('high_scores.best_game')}
            </div>
            <div className="flex flex-col items-center justify-center leading-none">
              <div className="flex items-center gap-2 font-bold">
                <div className="text-4xl">
                  {highScores.bestSongs}
                </div>
                <div className="text-xs">
                  {t('score.songs', {count: highScores.bestSongs})}
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <div className="text-6xl">
                  {highScores.bestPoints}
                </div>
                <div className="text-xs">
                  {t('score.points')}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {t('high_scores.max_points')}
            </div>
            <div>
              {highScores.bestPoints}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {t('high_scores.max_songs')}
            </div>
            <div>
              {highScores.maxCorrect}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {t('high_scores.total_games')}
            </div>
            <div>
              {highScores.totalGames}
            </div>
          </div>
        </div>
      }
    </Modal>
  );
}