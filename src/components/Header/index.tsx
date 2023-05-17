import { useState } from 'react';
import { ReactComponent as HelpIcon } from '../../icons/help_rounded.svg';
import { ReactComponent as CancelIcon } from '../../icons/cancel_rounded.svg';

export const Header = () => {
  const [showHelp, setShowHelp] = useState<boolean>(!localStorage.getItem('firstHelp'));

  const handleClose = () => {
    setShowHelp(false);
    localStorage.setItem('firstHelp', 'true');
  };

  return (
    <header className="flex items-center justify-end text-[#542163] z-[1]">
      <button
        className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
        onClick={() => setShowHelp(true)}
      >
        <HelpIcon />
      </button>
      {showHelp &&
        <div
          className="fixed inset-0 px-8 flex items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <div className=" max-w-lg max-h-[calc(100vh-4rem)] rounded-lg overflow-scroll">
            <div
              className="flex flex-col gap-4 p-4 bg-[#542163] text-neutral-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-4">
                <h2 className="grow text-xl font-bold mb-2">How to play</h2>
                <button
                  className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
                  onClick={handleClose}
                >
                  <CancelIcon />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  Write a {process.env.REACT_APP_ARTIST} song title in the input field and press the send button or enter key
                </div>
                <div>
                  Write another song title and repeat so many times you can before the timer ends
                </div>
                <div>
                  The case of the song title doesn't matter but all punctuation marks are required
                </div>
                <div>
                  You get 100 points per character for each correct song title
                </div>
                <div>
                  The wrong song titles gets 0 points
                </div>
                <div>
                  The repeated song titles gets 0 points
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </header>
  );
};
