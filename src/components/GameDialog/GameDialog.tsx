import * as React from 'react';
import GameButton from '../GameButton';

type GameDialogProps = {
  onRestart?: () => void;
};

function GameDialog(
  { onRestart }: GameDialogProps,
  ref: React.Ref<HTMLDialogElement>
) {
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 37rem)');

    function handleMediaChange(e: MediaQueryListEvent) {
      if (e.matches && ref && 'current' in ref && ref.current?.open) {
        ref.current.close();
      }
    }

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [ref]);

  function closeDialog() {
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  }

  return (
    <dialog
      className="bg-gray-light text-blue-dark text-450 mx-auto my-auto space-y-4 rounded-[10px] p-6 backdrop:bg-black backdrop:opacity-50"
      ref={ref}
    >
      <GameButton
        type="reset"
        autoFocus
        className="bg-blue-lighter hover:bg-yellow focus:bg-yellow focus:text-gray-lighter hover:text-gray-lighter w-full rounded-full p-3"
        onClick={onRestart}
      >
        Restart
      </GameButton>
      <GameButton
        href="/"
        replace
        className="bg-blue-lighter hover:bg-yellow focus:bg-yellow focus:text-gray-lighter hover:text-gray-lighter inline-block w-full rounded-full p-3 text-center"
      >
        New Game
      </GameButton>
      <GameButton
        type="button"
        className="bg-blue-lighter hover:bg-yellow focus:bg-yellow focus:text-gray-lighter hover:text-gray-lighter w-full rounded-full p-3"
        onClick={closeDialog}
      >
        Resume Game
      </GameButton>
    </dialog>
  );
}

export default React.forwardRef(GameDialog);
