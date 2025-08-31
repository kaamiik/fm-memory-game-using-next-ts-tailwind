'use client';
import * as React from 'react';

import PageHeader from '../PageHeader';
import CardGrid from '../CardGrid';
import ScoreBoard from '../ScoreBoard';
import useTimer from '@/hooks/useTimer';
import type { Card } from '@/types/gameTypes';
import { generateCards } from '@/utils';
import GameOverDialog from '../GameOverDialog';
import { GameActionsProvider } from '@/context/GameActionsContext';

type GameStartProps = {
  gridSize: '4x4' | '6x6';
  playersNum: 1 | 2 | 3 | 4;
  theme: 'numbers' | 'icons';
};

type GameState = {
  cards: Card[];
  activePlayerId: 1 | 2 | 3 | 4;
  playerScores: number[];
  moves: number;
  isProcessing: boolean;
};

function GameStart({ gridSize, playersNum, theme }: GameStartProps) {
  const { time, start, stop, reset } = useTimer();

  const initialCards = React.useMemo(() => {
    return generateCards(gridSize, theme).map((card) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }));
  }, [gridSize, theme]);

  const [gameState, setGameState] = React.useState<GameState>(() => ({
    cards: initialCards,
    activePlayerId: 1,
    playerScores: Array(playersNum).fill(0),
    moves: 0,
    isProcessing: false,
  }));

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const isGameOver = React.useMemo(() => {
    return (
      gameState.cards.length > 0 &&
      gameState.cards.every((card) => card.isMatched)
    );
  }, [gameState.cards]);

  // For showing game progress
  const matchedPairs = React.useMemo(() => {
    return gameState.cards.filter((card) => card.isMatched).length / 2;
  }, [gameState.cards]);

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
    reset();
    if (playersNum === 1) start();
  }, [playersNum, reset, start]);

  const handleRestart = React.useCallback(() => {
    dialogRef.current?.close();
    setGameState({
      cards: initialCards,
      activePlayerId: 1,
      playerScores: Array(playersNum).fill(0),
      moves: 0,
      isProcessing: false,
    });
    reset();
    if (playersNum === 1) start();
  }, [initialCards, playersNum, reset, start]);

  const getNextPlayer = React.useCallback(
    (currentPlayerId: number): 1 | 2 | 3 | 4 => {
      if (currentPlayerId >= playersNum) {
        return 1;
      }
      return (currentPlayerId + 1) as 1 | 2 | 3 | 4;
    },
    [playersNum]
  );

  const handleCardClick = React.useCallback(
    (clickedCard: Card) => {
      if (
        gameState.isProcessing ||
        clickedCard.isFlipped ||
        clickedCard.isMatched
      )
        return;

      setGameState((prevState) => {
        const updatedCards = prevState.cards.map((card) =>
          card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );

        const newFlipped = updatedCards.filter(
          (card) => card.isFlipped && !card.isMatched
        );

        // If less than 2 cards flipped, just update cards
        if (newFlipped.length < 2) {
          return {
            ...prevState,
            cards: updatedCards,
          };
        }

        // Two cards flipped - check for match
        const isMatch = newFlipped[0].value === newFlipped[1].value;

        if (isMatch) {
          // Immediate match - update matched status and scores
          const matchedCards = updatedCards.map((card) =>
            card.id === newFlipped[0].id || card.id === newFlipped[1].id
              ? { ...card, isMatched: true }
              : card
          );

          const newScores =
            playersNum > 1
              ? prevState.playerScores.map((score, index) =>
                  index === prevState.activePlayerId - 1 ? score + 1 : score
                )
              : prevState.playerScores;

          return {
            ...prevState,
            cards: matchedCards,
            moves: prevState.moves + 1,
            playerScores: newScores,
            // Don't change active player on match
          };
        } else {
          // No match - set processing state, will flip back after timeout
          const nextPlayer =
            playersNum > 1
              ? getNextPlayer(prevState.activePlayerId)
              : prevState.activePlayerId;

          setTimeout(() => {
            setGameState((currentState) => ({
              ...currentState,
              cards: currentState.cards.map((card) =>
                card.id === newFlipped[0].id || card.id === newFlipped[1].id
                  ? { ...card, isFlipped: false }
                  : card
              ),
              activePlayerId: nextPlayer,
              isProcessing: false,
            }));
          }, 800);

          return {
            ...prevState,
            cards: updatedCards,
            moves: prevState.moves + 1,
            isProcessing: true,
          };
        }
      });
    },
    [gameState.isProcessing, playersNum, getNextPlayer]
  );

  return (
    <GameActionsProvider value={{ restart: handleRestart }}>
      <PageHeader />
      <main className="grid p-6 sm:p-10 lg:p-9 xl:px-0">
        <h1 className="sr-only">
          Memory game, {playersNum === 1 ? 'solo' : 'multiplayer'}, grid{' '}
          {gridSize.replace('x', ' by ')}, theme {theme}
        </h1>
        <CardGrid
          gridSize={gridSize}
          cards={gameState.cards}
          onCardClick={handleCardClick}
        />

        {playersNum === 1 ? (
          <ScoreBoard mode="solo" time={time} moves={gameState.moves} />
        ) : (
          <ScoreBoard
            mode="multi"
            playersNum={playersNum}
            activePlayerId={gameState.activePlayerId}
            playerScores={gameState.playerScores}
          />
        )}

        {playersNum === 1 ? (
          <GameOverDialog
            ref={dialogRef}
            mode="solo"
            title="You did it!"
            message="Game Over! Here's how you got on..."
            time={time}
            moves={gameState.moves}
          />
        ) : (
          <GameOverDialog
            ref={dialogRef}
            mode="multi"
            playerScores={gameState.playerScores}
            playersNum={playersNum}
          />
        )}
      </main>
    </GameActionsProvider>
  );
}

export default GameStart;
