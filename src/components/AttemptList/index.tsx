import { useEffect, useRef } from 'react';
import { Attempt, AttemptStatus } from '../../interfaces';

interface AttempListProps {
  list: Attempt[];
  onEnd: () => void;
}

export const AttemptList = ({list, onEnd}: AttempListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(list.length === 0) {
      onEnd();
      return;
    }
    const rows = listRef.current?.querySelectorAll('.row');
    if (rows) {
      let delay = 0;
      rows.forEach((row, i) => {
        setTimeout(() => {
          row.classList.add('animate-slide-down');
          if(i === rows.length - 1) {
            onEnd();
          }
        }, delay);
        delay += 100;
      });
    }
  }, [list, onEnd]);

  return (
    <>
      {list.length > 0 &&
        <div ref={listRef} className="flex flex-wrap gap-2 leading-none text-neutral-300">
          {list.map(attempt => (
            <div
              key={attempt.id}
              className={`row opacity-0 flex items-center justify-center gap-5 rounded-lg px-4 py-2 bg-[#542163] ${attempt.status !== AttemptStatus.CORRECT ?  'bg-opacity-50' : ''}`}
            >
              <div className="font-medium">
                {attempt.word}
              </div>
              <div className="grow text-xs text-right">
                {attempt.points}
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
};
