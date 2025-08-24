import * as React from "react";
import GameStat from "../GameStat";

type ScoreBoardProps =
  | {
      mode: "solo";
      time: string;
      moves: number;
      className?: string;
    }
  | {
      mode: "multi";
      playersNum: 1 | 2 | 3 | 4;
      activePlayerId?: 1 | 2 | 3 | 4;
      playerScores: number[];
      className?: string;
    };

function ScoreBoard(props: ScoreBoardProps) {
  const base =
    "max-w-[69.375rem] flex-1 flex justify-center gap-6 sm:gap-3 lg:gap-8";
  const cls = props.className ? `${base} ${props.className}` : base;

  if (props.mode === "solo") {
    return (
      <div className="mt-auto pt-24 pb-16 flex justify-center">
        <div className={cls}>
          <GameStat label="Time" value={props.time} />
          <GameStat label="Moves" value={props.moves} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto pt-24 pb-16 flex justify-center">
      <div className={cls}>
        {Array.from({ length: props.playersNum }, (_, i) => {
          const playerId = (i + 1) as 1 | 2 | 3 | 4;
          return (
            <GameStat
              key={playerId}
              player={playerId}
              value={props.playerScores[i]}
              activePlayer={props.activePlayerId}
              aria-current={
                props.activePlayerId === playerId ? "true" : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default ScoreBoard;
