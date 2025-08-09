import * as React from "react";
import GameButton from "../GameButton";

type GameDialogProps = {
  onRestart?: () => void;
  onNewGame?: () => void;
};

function GameDialog(
  { onRestart, onNewGame }: GameDialogProps,
  ref: React.Ref<HTMLDialogElement>
) {
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 37rem)");

    function handleMediaChange(e: MediaQueryListEvent) {
      if (e.matches && ref && "current" in ref && ref.current?.open) {
        ref.current.close();
      }
    }

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [ref]);

  function closeDialog() {
    if (ref && "current" in ref) {
      ref.current?.close();
    }
  }

  return (
    <dialog
      className="bg-gray-light p-6 text-blue-dark text-450 space-y-4 rounded-[10px] mx-auto my-auto backdrop:bg-black backdrop:opacity-50"
      ref={ref}
    >
      <GameButton
        autoFocus
        className="w-full p-3 rounded-full bg-blue-lighter hover:bg-yellow focus:bg-yellow focus:text-gray-lighter hover:text-gray-lighter"
        onClick={onRestart}
      >
        Restart
      </GameButton>
      <GameButton
        className="w-full p-3 rounded-full bg-blue-lighter hover:bg-yellow focus:bg-yellow focus:text-gray-lighter hover:text-gray-lighter"
        onClick={onNewGame}
      >
        New Game
      </GameButton>
      <GameButton
        className="w-full p-3 rounded-full bg-blue-lighter hover:bg-yellow focus:bg-yellow focus:text-gray-lighter hover:text-gray-lighter"
        onClick={closeDialog}
      >
        Resume Game
      </GameButton>
    </dialog>
  );
}

export default React.forwardRef(GameDialog);
