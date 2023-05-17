import { useCallback, useState } from 'react';
import { Input } from '../../components/Input';
import { albums } from '../../data';
import { Countdown } from '../../components/Countdown';
import { CHAR_BASE_POINTS, GAME_TIMER } from '../../config';
import { Attempt, AttemptStatus, GameStatus } from '../../interfaces';
import { AttemptList } from '../../components/AttemptList';
import { Score } from '../../components/Score';
import { Header } from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { endGame, playAgain, sendWord, startGame } from '../../services/ga';

const data: string[] = albums.map((album: any) => album.tracks).flat();

const getAttempt = (attemptWord: string, attempts: Attempt[]): Attempt => {
  const alreayAttempt = attempts.find(attempt => attempt.word.toLowerCase() === attemptWord.toLowerCase());
  if(alreayAttempt) {
    return {
      id: `${attempts.length}`,
      word: attemptWord,
      correct: alreayAttempt.correct,
      status: alreayAttempt.correct ? AttemptStatus.REPEATED : AttemptStatus.WRONG,
      points: 0,
    };
  }
  const correctWord = data.find(word => word.toLowerCase() === attemptWord.toLowerCase());
  const attempt = {
    id: `${attempts.length}`,
    word: attemptWord,
    correct: correctWord,
    status: correctWord ? AttemptStatus.CORRECT : AttemptStatus.WRONG,
    points: CHAR_BASE_POINTS * (correctWord?.length || 0),
  };
  return attempt;
};

export const Home = () => {
  const { t } = useTranslation();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.INITIAL);
  const [showSongsList, setShowSongsList] = useState<boolean>(false);
  const [showPlayAgain, setShowPlayAgain] = useState<boolean>(false);

  const handleSubmit = (word: string) => {
    setAttempts((prev) => {
      const attempt = getAttempt(word, prev);
      sendWord(attempt.word, attempt.status);
      return [
        ...prev,
        attempt,
      ];
    });
  };

  const handleStart = useCallback((again?: boolean) => {
    setGameStatus(GameStatus.COUNTDOWN);
    setAttempts([]);
    setShowSongsList(false);
    setShowPlayAgain(false);
    !again ? startGame() : playAgain();
  }, []);
  
  const handleCountdownEnd = useCallback(() => {
    setGameStatus(GameStatus.PLAYING);
  }, []);

  const handleEnd = useCallback(() => {
    setGameStatus(GameStatus.FINISHED);
    endGame();
  }, []);

  const handlePointsEnd = useCallback(() => {
    setShowSongsList(true);
  }, []);

  const handleEndList = useCallback(() => {
    setShowPlayAgain(true);
  }, []);

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-4 p-4 select-none">
      <Header />
      {gameStatus === GameStatus.INITIAL &&
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className={`rounded-full h-32 aspect-square bg-[#542163] text-2xl font-bold text-neutral-300 shadow-lg shadow-black/40 hover:bg-opacity-80 active:animate-push`}
            onClick={() => handleStart()}
          >
            {t('button.play')}
          </button>
        </div>
      }
      {gameStatus === GameStatus.COUNTDOWN &&
        <div className="absolute inset-0 flex items-center justify-center font-bold text-8xl text-center">
          <Countdown
            seconds={4}
            first
            lastWord={t('countdown.last_word')}
            onEnd={handleCountdownEnd}
          />
        </div>
      }
      {gameStatus === GameStatus.PLAYING &&
        <div className="flex flex-col gap-4">
          <div className="text-6xl text-center font-bold">
            <Countdown
              seconds={GAME_TIMER}
              format
              onEnd={handleEnd}
            />
          </div>
          <Input
            onSubmit={handleSubmit}
          />
        </div>
      }
      {gameStatus === GameStatus.FINISHED &&
        <Score
          points={attempts.reduce((acc, attempt) => acc + attempt.points, 0)}
          songs={attempts.filter(attempt => attempt.status === AttemptStatus.CORRECT).length}
          onEnd={handlePointsEnd}
        />
      }
      {showSongsList &&
        <>
          <AttemptList
            list={attempts}
            onEnd={handleEndList}
          />
        </>
      }
      {showPlayAgain &&
        <div className="flex justify-center mt-12">
          <button
            className={`rounded-full h-32 aspect-square bg-[#542163] text-2xl font-bold text-neutral-300 shadow-lg shadow-black/40 hover:bg-opacity-80 active:animate-push`}
            onClick={() => handleStart(true)}
          >
            <div>
              {t('button.play_again1')}
            </div>
            <div>
              {t('button.play_again2')}
            </div>
          </button>
        </div>
      }
    </div>
  );
};
