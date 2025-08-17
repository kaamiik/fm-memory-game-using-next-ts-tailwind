import * as React from "react";
import { useSearchParams } from "next/navigation";

import useIsGameStarted from "@/hooks/useIsGameStarted";
import PageHeader from "../PageHeader";
import CardGrid from "../CardGrid";
import ScoreBoard from "../ScoreBoard";
import useTimer from "@/hooks/useTimer";
import type { Card } from "@/types/gameTypes";
import { generateCards } from "@/utils";
import GameButton from "../GameButton";

function GameStart() {
  const isGameStarted = useIsGameStarted();
  const { time, start, stop, reset } = useTimer();
  const params = useSearchParams();
  const gridSize = params.get("grid") as "4x4" | "6x6";
  const playersNum = Number(params.get("playersNum")) as 1 | 2 | 3 | 4;

  const [cards, setCards] = React.useState<Card[]>([]);
  const [moves, setMoves] = React.useState(0);

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const isGameOver = cards.length > 0 && cards.every((card) => card.isMatched);

  React.useEffect(() => {
    if (isGameOver) {
      stop();
      dialogRef.current?.showModal();
    }
  }, [isGameOver, stop]);

  React.useEffect(() => {
    if (isGameStarted) {
      setCards(generateCards(gridSize));
      setMoves(0);
      reset();
      if (playersNum === 1) start();
    }
  }, [isGameStarted, playersNum, gridSize, reset, start]);

  function handleCardClick(clickedCard: Card) {
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlipped = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);

      if (newFlipped[0].value === newFlipped[1].value) {
        // Match case
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === newFlipped[0].id || card.id === newFlipped[1].id
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        // No match case
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === newFlipped[0].id || card.id === newFlipped[1].id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
    }
  }

  if (isGameStarted) {
    return (
      <>
        <PageHeader />
        <main className="p-6 sm:p-10 lg:p-9 xl:px-0 grid">
          <CardGrid
            gridSize={gridSize}
            cards={cards}
            onCardClick={handleCardClick}
          />

          {playersNum === 1 ? (
            <ScoreBoard mode="solo" time={time} moves={moves} />
          ) : (
            <ScoreBoard
              mode="multi"
              playersNum={playersNum}
              activePlayerId={1}
            />
          )}
          <dialog
            className="w-full max-w-[40.875rem] mx-auto my-auto backdrop:bg-black backdrop:opacity-50 border-0 bg-transparent"
            ref={dialogRef}
          >
            <div className="grid gap-6 sm:gap-10 pt-8 sm:pt-[3.25rem] pb-6 sm:pb-[4.25rem] px-6 sm:px-14 mx-6 rounded-[10px] sm:rounded[20px] text-blue-muted bg-gray-light">
              <div className="text-center">
                <h2 className="text-600 sm:text-900 text-blue-darker">
                  You did it!
                </h2>
                <p>Game over! Here’s how you got on…</p>
              </div>
              <div className="grid gap-2 sm:gap-4">
                <div className="bg-blue-lighter py-4 px-4 sm:px-8 flex justify-between items-center rounded-[5px] sm:rounded-[10px]">
                  <p>Time Elapsed</p>
                  <p className="text-blue-dark text-500 sm:text-700">{time}</p>
                </div>
                <div className="bg-blue-lighter py-4 px-4 sm:px-8 flex justify-between items-center rounded-[5px] sm:rounded-[10px]">
                  <p>Moves Taken</p>
                  <p className="text-blue-dark text-500 sm:text-700">
                    {`${moves} Moves`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <GameButton
                  type="button"
                  className="flex-1 py-3.5 px-7 bg-yellow text-500 text-gray-lighter hover:bg-yellow-light focus-visible:bg-yellow-light"
                >
                  Restart
                </GameButton>
                <GameButton
                  type="button"
                  className="flex-1 py-3.5 px-6 bg-blue-lighter text-500 text-blue-dark hover:bg-blue-medium hover:text-gray-lighter focus-visible:bg-blue-medium focus-visible:text-gray-lighter"
                >
                  Setup New Game
                </GameButton>
              </div>
            </div>
          </dialog>
        </main>
      </>
    );
  }

  return null;
}

export default GameStart;
