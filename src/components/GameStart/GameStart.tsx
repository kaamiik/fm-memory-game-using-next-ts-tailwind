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
  const theme = params.get("theme") as "numbers" | "icons";

  const [cards, setCards] = React.useState<Card[]>([]);
  const [activePlayerId, setActivePlayerId] = React.useState<1 | 2 | 3 | 4>(1);
  const [playerScores, setPlayerScores] = React.useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [moves, setMoves] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

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
      const newCards = generateCards(gridSize, theme).map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }));
      setCards(newCards);
      setActivePlayerId(1);
      setPlayerScores([0, 0, 0, 0]);
      setMoves(0);
      setIsProcessing(false);
      reset();
      if (playersNum === 1) start();
    }
  }, [isGameStarted, playersNum, gridSize, theme, reset, start]);

  function handleRestart() {
    dialogRef.current?.close();
    const newCards = generateCards(gridSize, theme).map((card) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setActivePlayerId(1);
    setPlayerScores([0, 0, 0, 0]);
    setMoves(0);
    setIsProcessing(false);
    reset();
    if (playersNum === 1) start();
  }

  function getNextPlayer(currentPlayerId: number): 1 | 2 | 3 | 4 {
    return ((currentPlayerId % playersNum) + 1) as 1 | 2 | 3 | 4;
  }

  function handleCardClick(clickedCard: Card) {
    if (isProcessing || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlipped = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsProcessing(true);
      if (newFlipped[0].value === newFlipped[1].value) {
        // Match case
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === newFlipped[0].id || card.id === newFlipped[1].id
              ? { ...card, isMatched: true }
              : card
          )
        );

        // Multiplayer: current player gets a point and keeps turn
        if (playersNum > 1) {
          setPlayerScores((prev) => {
            const newScores = [...prev];
            newScores[activePlayerId - 1]++;
            return newScores;
          });
        }

        setIsProcessing(false);
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
          // Multiplayer: switch to next player
          if (playersNum > 1) {
            setActivePlayerId(getNextPlayer(activePlayerId));
          }
          setIsProcessing(false);
        }, 800);
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
              activePlayerId={activePlayerId}
              playerScores={playerScores}
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
