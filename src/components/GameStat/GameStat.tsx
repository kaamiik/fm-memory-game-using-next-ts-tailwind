import * as React from "react";

type GameStatProps = {
  player?: 1 | 2 | 3 | 4;
  label?: string;
  value: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function GameStat({
  player,
  label,
  value,
  className = "",
  ...delegated
}: GameStatProps) {
  return (
    <div
      className={`max-w-[15.9375rem] grow py-1.5 sm:py-3 sm:px-4 flex flex-col lg:flex-row items-center sm:items-baseline lg:justify-between lg:items-center bg-blue-lighter rounded-[5px] sm:rounded-[10px] ${className}`}
      {...delegated}
    >
      {player ? (
        <p className="text-350 lg:text-450" data-player={player}></p>
      ) : (
        <p className="text-350 lg:text-450">{label}</p>
      )}
      <p className="text-600 lg:text-700 text-blue-dark">{value}</p>
    </div>
  );
}

export default GameStat;
