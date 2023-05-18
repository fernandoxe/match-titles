import { useState } from 'react';
import { ReactComponent as HelpIcon } from '../../icons/help_rounded.svg';
import { ReactComponent as MedalIcon } from '../../icons/medal_rounded.svg';
import { useTranslation } from 'react-i18next';
import { openHelp } from '../../services/ga';
import { Modal } from '../Modal';
import { HightScores } from '../HighScores';

export const Header = () => {
  const { t } = useTranslation();
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showHighScores, setShowHighScores] = useState<boolean>(false);

  const handleHelpOpen = () => {
    setShowHelp(true);
    openHelp();
  };

  const handleHelpClose = () => {
    setShowHelp(false);
  };

  const handleHighScoresOpen = () => {
    setShowHighScores(true);
    openHelp();
  };

  const handleHighScoresClose = () => {
    setShowHighScores(false);
  };

  return (
    <header className="flex gap-4 items-center justify-end text-[#542163] z-[1]">
      <button
        className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
        onClick={handleHighScoresOpen}
      >
        <MedalIcon />
      </button>
      <button
        className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
        onClick={handleHelpOpen}
      >
        <HelpIcon />
      </button>
      {showHelp &&
        <Modal
          title={t('help.title')}
          onClose={handleHelpClose}
        >
          <div className=" flex flex-col gap-4 text-sm">
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
        </Modal>
      }
      {showHighScores &&
        <HightScores onClose={handleHighScoresClose} />
      }
    </header>
  );
};
