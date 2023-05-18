import { ReactNode } from 'react';
import { ReactComponent as CancelIcon } from '../../icons/cancel_rounded.svg';

export interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({title, children, onClose}: ModalProps) => {
  return (
    <div
      className="fixed inset-0 px-8 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div className="w-96 max-h-[calc(100vh-4rem)] rounded-lg overflow-scroll">
        <div
          className="flex flex-col gap-6 p-4 bg-[#542163] text-neutral-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-4">
            <h2 className="grow text-xl font-bold">
              {title}
            </h2>
            <button
              className="h-6 aspect-square hover:text-opacity-80 active:animate-push"
              onClick={onClose}
            >
              <CancelIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}