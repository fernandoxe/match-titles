import { useState, useRef, FormEvent } from 'react';
import { ReactComponent as SendIcon } from '../../icons/send_rounded.svg';

interface InputProps {
  onSubmit: (value: string) => void;
}

export const Input = ({ onSubmit }: InputProps)=> {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue.trim().replace(/\s+/g, ' '));
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <form
      className="flex gap-2"
      onSubmit={handleSubmit}
    >
      <input  
        type="text"
        className="grow rounded-lg py-2 px-4 bg-[#542163] text-neutral-300 outline-neutral-300"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        autoFocus
      />
      <button
        className="rounded-lg text-xs h-10 p-2 aspect-square bg-[#542163] leading-none text-neutral-300 shadow-lg shadow-black/40 hover:bg-opacity-80 active:animate-push disabled:bg-opacity-50 disabled:animate-none"
        disabled={!inputValue.trim()}
      >
        <SendIcon />
      </button>
    </form>
  );
};
