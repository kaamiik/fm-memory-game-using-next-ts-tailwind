import * as React from "react";
import DialogStat from "../DialogStat";
import GameButton from "../GameButton";
import { useRouter } from "next/navigation";
import { useGameActions } from "@/context/GameActionsContext";

type GameOverDialogProps = {
  title: string;
  message: string;
  time: string;
  moves: number;
};

const GameOverDialog = React.forwardRef<HTMLDialogElement, GameOverDialogProps>(
  ({ title, message, time, moves }, ref) => {
    const { restart } = useGameActions();
    const router = useRouter();

    function handleRestart() {
      if (ref && "current" in ref) {
        ref.current?.close();
      }
      restart();
    }

    function handleNewGame() {
      if (ref && "current" in ref) {
        ref.current?.close();
      }
      router.replace("/");
    }

    return (
      <dialog
        className="w-full max-w-[40.875rem] mx-auto my-auto backdrop:bg-black backdrop:opacity-50 border-0 bg-transparent"
        ref={ref}
      >
        <div className="grid gap-6 sm:gap-10 pt-8 sm:pt-[3.25rem] pb-6 sm:pb-[4.25rem] px-6 sm:px-14 mx-6 rounded-[10px] sm:rounded[20px] text-blue-muted bg-gray-light">
          <div className="text-center">
            <h2 className="text-600 sm:text-900 text-blue-darker">{title}</h2>
            <p>{message}</p>
          </div>

          <div className="grid gap-2 sm:gap-4">
            <DialogStat label="Time Elapsed" value={time} />
            <DialogStat label="Moves Taken" value={`${moves} Moves`} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <GameButton
              type="button"
              className="flex-1 py-3.5 px-7 bg-yellow text-500 text-gray-lighter hover:bg-yellow-light focus-visible:bg-yellow-light"
              onClick={handleRestart}
            >
              Restart
            </GameButton>
            <GameButton
              type="button"
              className="flex-1 py-3.5 px-6 bg-blue-lighter text-500 text-blue-dark hover:bg-blue-medium hover:text-gray-lighter focus-visible:bg-blue-medium focus-visible:text-gray-lighter"
              onClick={handleNewGame}
            >
              Setup New Game
            </GameButton>
          </div>
        </div>
      </dialog>
    );
  }
);

GameOverDialog.displayName = "GameOverDialog";
export default GameOverDialog;
