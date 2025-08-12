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
      className?: string;
    };

function ScoreBoard(props: ScoreBoardProps) {
  const base =
    "max-w-[69.375rem] flex-1 flex justify-center gap-6 sm:gap-3 lg:gap-8";
  const cls = props.className ? `${base} ${props.className}` : base;

  if (props.mode === "solo") {
    return (
      <div className="mt-auto pt-24 flex justify-center">
        <div className={cls}>
          <GameStat label="Time" value={props.time} />
          <GameStat label="Moves" value={props.moves} />
        </div>
      </div>
    );
  }

  const players = Array.from({ length: props.playersNum }, (_, i) => ({
    id: (i + 1) as 1 | 2 | 3 | 4,
    score: 0,
  }));

  return (
    <div className="mt-auto pt-24 flex justify-center">
      <div className={cls}>
        {players.map((p) => (
          <GameStat
            key={p.id}
            player={p.id}
            value={p.score}
            aria-current={props.activePlayerId === p.id ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
