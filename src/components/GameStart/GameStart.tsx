import * as React from "react";
import { useSearchParams } from "next/navigation";

import useIsGameStarted from "@/hooks/useIsGameStarted";
import PageHeader from "../PageHeader";
import CardGrid from "../CardGrid";
import ScoreBoard from "../ScoreBoard";
import useTimer from "@/hooks/useTimer";
import type { Card } from "@/types/gameTypes";
import { generateCards } from "@/utils";
import GameOverDialog from "../GameOverDialog";
import { GameActionsProvider } from "@/context/GameActionsContext";

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
    let interval: NodeJS.Timeout | undefined;
    if (isGameOver) {
      stop();
      interval = setTimeout(() => {
        dialogRef.current?.showModal();
      }, 500);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [isGameOver, stop]);

  React.useEffect(() => {
    if (isGameStarted) {
      setCards(generateCards(gridSize));
      setMoves(0);
      reset();
      if (playersNum === 1) start();
    }
  }, [isGameStarted, playersNum, gridSize, reset, start]);

  function handleRestart() {
    dialogRef.current?.close();
    setCards(generateCards(gridSize));
    setMoves(0);
    reset();
    if (playersNum === 1) start();
  }

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
      <GameActionsProvider value={{ restart: handleRestart }}>
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

          <GameOverDialog
            ref={dialogRef}
            title="You did it!"
            message="Game Over! Her's how you got on..."
            time={time}
            moves={moves}
          />
        </main>
      </GameActionsProvider>
    );
  }

  return null;
}

export default GameStart;
