import * as React from "react";

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
  className = "",
  ...delegated
}: GameStatProps) {
  const isPlayerTurn =
    player !== undefined &&
    activePlayer !== undefined &&
    activePlayer === player;
  return (
    <div
      className={`relative max-w-[15.9375rem]  py-1.5 sm:py-3 sm:px-4 flex flex-col grow lg:flex-row items-center sm:items-baseline lg:justify-between lg:items-center bg-blue-lighter transition-all duration-500 ease-in-out ${
        isPlayerTurn && "bg-yellow"
      } rounded-[5px] sm:rounded-[10px] ${className}`}
      {...delegated}
    >
      {isPlayerTurn && <div className="arrow"></div>}
      {player ? (
        <p
          className={`text-350 lg:text-450 transition-colors duration-500 delay-100 ${
            isPlayerTurn && "text-gray-lighter"
          }`}
          data-player={player}
        ></p>
      ) : (
        <p className="text-350 lg:text-450">{label}</p>
      )}
      <p
        className={`text-600 lg:text-700 text-blue-dark transition-colors duration-500 delay-100 ${
          isPlayerTurn && "text-gray-lighter"
        }`}
      >
        {value}
      </p>
      {isPlayerTurn && (
        <p className="hidden lg:block absolute -bottom-12 left-[17%] text-[0.8125rem] text-blue-darker uppercase tracking-[5px] animate-fade-in">
          current turn
        </p>
      )}
    </div>
  );
}

export default GameStat;
