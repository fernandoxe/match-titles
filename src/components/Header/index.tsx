import { useState } from 'react';
import { ReactComponent as HelpIcon } from '../../icons/help_rounded.svg';
import { ReactComponent as CancelIcon } from '../../icons/cancel_rounded.svg';
import { useTranslation } from 'react-i18next';
import { openHelp } from '../../services/ga';

export const Header = () => {
  const { t } = useTranslation();
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const handleOpen = () => {
    setShowHelp(true);
    openHelp();
  };

  const handleClose = () => {
    setShowHelp(false);
  };

  return (
    <header className="flex items-center justify-end text-[#542163] z-[1]">
      <button
        className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
        onClick={handleOpen}
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
                <h2 className="grow text-xl font-bold mb-2">
                  {t('help.title')}
                </h2>
                <button
                  className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
                  onClick={handleClose}
                >
                  <CancelIcon />
                </button>
              </div>
              <div className="flex flex-col gap-4 text-sm">
                <div>
                  {t('help.line1', {artist: process.env.REACT_APP_ARTIST})}
                </div>
                <div>
                  {t('help.line2')}
                </div>
                <div>
                  {t('help.line_extra')}
                </div>
                <div>
                  {t('help.line3')}
                </div>
                <div>
                  {t('help.line4')}
                </div>
                <div>
                  {t('help.line5')}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </header>
  );
};
