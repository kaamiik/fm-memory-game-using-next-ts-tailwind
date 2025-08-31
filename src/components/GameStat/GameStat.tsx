import * as React from 'react';

type GameStatProps = {
  player?: 1 | 2 | 3 | 4;
  activePlayer?: 1 | 2 | 3 | 4 | undefined;
  label?: string;
  value: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function GameStat({
  player,
  activePlayer,
  label,
  value,
  className = '',
  ...delegated
}: GameStatProps) {
  const isPlayerTurn =
    player !== undefined &&
    activePlayer !== undefined &&
    activePlayer === player;
  return (
    <div
      className={`bg-blue-lighter relative flex max-w-[15.9375rem] grow flex-col items-center py-1.5 transition-all duration-500 ease-in-out sm:items-baseline sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between ${
        isPlayerTurn && 'bg-yellow'
      } rounded-[5px] sm:rounded-[10px] ${className}`}
      {...delegated}
    >
      {isPlayerTurn && <div className="arrow"></div>}
      {player ? (
        <p
          className={`text-350 lg:text-450 transition-colors delay-100 duration-500 ${
            isPlayerTurn && 'text-gray-lighter'
          }`}
          data-player={player}
        ></p>
      ) : (
        <p className="text-350 lg:text-450">{label}</p>
      )}
      <p
        className={`text-600 lg:text-700 text-blue-dark transition-colors delay-100 duration-500 ${
          isPlayerTurn && 'text-gray-lighter'
        }`}
      >
        {value}
      </p>
      {isPlayerTurn && (
        <p className="text-blue-darker animate-fade-in absolute -bottom-12 left-[17%] hidden text-[0.8125rem] tracking-[5px] uppercase lg:block">
          current turn
        </p>
      )}
    </div>
  );
}

export default GameStat;
