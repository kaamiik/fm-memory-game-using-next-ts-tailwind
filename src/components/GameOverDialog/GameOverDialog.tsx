import * as React from "react";
import DialogStat from "../DialogStat";
import GameButton from "../GameButton";
import { useGameActions } from "@/context/GameActionsContext";

type GameOverDialogProps =
  | {
      mode: "solo";
      title: string;
      message: string;
      time: string;
      moves: number;
    }
  | {
      mode: "multi";
      playerScores: number[];
      playersNum: number;
    };

const GameOverDialog = React.forwardRef<HTMLDialogElement, GameOverDialogProps>(
  (props, ref) => {
    const { restart } = useGameActions();

    function handleRestart() {
      if (ref && "current" in ref) {
        ref.current?.close();
      }
      restart();
    }

    if (props.mode === "multi") {
      const { playerScores, playersNum } = props;

      const maxScore = Math.max(...playerScores);

      const winners = playerScores
        .map((score, index) => ({ score, playerId: index + 1 }))
        .filter((player) => player.score === maxScore);

      const isTie = winners.length > 1;
      const title = isTie
        ? "It's a tie!"
        : `Player ${winners[0].playerId} Wins!`;

      const message = "Game over! Here are the results…";

      const sortedPlayers = playerScores
        .slice(0, playersNum)
        .map((score, index) => ({ score, playerId: index + 1 }))
        .sort((a, b) => b.score - a.score);

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

            <ul className="grid gap-2 sm:gap-4">
              {sortedPlayers.map((player) => {
                const isWinner = winners.some(
                  (w) => w.playerId === player.playerId
                );
                const label = isWinner
                  ? isTie
                    ? `Player ${player.playerId} (Winner!)`
                    : `Player ${player.playerId} (Winner!)`
                  : `Player ${player.playerId}`;

                return (
                  <li key={player.playerId}>
                    <DialogStat
                      label={label}
                      value={`${player.score} Pairs`}
                      isWinner={isWinner}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <GameButton
                type="button"
                className="flex-1 py-3.5 px-7 bg-yellow text-500 text-gray-lighter hover:bg-yellow-light focus-visible:bg-yellow-light"
                onClick={handleRestart}
              >
                Restart
              </GameButton>
              <GameButton
                href="/"
                replace
                className="flex-1 py-3.5 px-6 bg-blue-lighter text-500 text-blue-dark hover:bg-blue-medium hover:text-gray-lighter focus-visible:bg-blue-medium focus-visible:text-gray-lighter"
              >
                Setup New Game
              </GameButton>
            </div>
          </div>
        </dialog>
      );
    }

    const { title, message, time, moves } = props;

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

          <ul className="grid gap-2 sm:gap-4">
            <li>
              <DialogStat label="Time Elapsed" value={time} />
            </li>
            <li>
              <DialogStat label="Moves Taken" value={`${moves} Moves`} />
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <GameButton
              type="button"
              className="flex-1 py-3.5 px-7 bg-yellow text-500 text-gray-lighter hover:bg-yellow-light focus-visible:bg-yellow-light"
              onClick={handleRestart}
            >
              Restart
            </GameButton>
            <GameButton
              href="/"
              replace
              className="flex-1 py-3.5 px-6 bg-blue-lighter text-500 text-blue-dark hover:bg-blue-medium hover:text-gray-lighter focus-visible:bg-blue-medium focus-visible:text-gray-lighter"
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
