import * as React from "react";
import { useSearchParams } from "next/navigation";

import useIsGameStarted from "@/hooks/useIsGameStarted";
import PageHeader from "../PageHeader";
import CardGrid from "../CardGrid";
import ScoreBoard from "../ScoreBoard";

function GameStart() {
  const isGameStarted = useIsGameStarted();
  const params = useSearchParams();
  const gridSize = params.get("grid") as "4x4" | "6x6";
  const playersNum = Number(params.get("playersNum")) as 1 | 2 | 3 | 4;

  if (isGameStarted) {
    return (
      <>
        <PageHeader />
        <main className="bg-gray-lighter p-6 sm:p-10 lg:p-9 xl:px-0 grid">
          <CardGrid gridSize={gridSize} />

          {playersNum === 1 ? (
            <ScoreBoard mode="solo" time="0:00" moves={0} />
          ) : (
            <ScoreBoard
              mode="multi"
              playersNum={playersNum}
              activePlayerId={1}
            />
          )}
        </main>
      </>
    );
  }

  return null;
}

export default GameStart;
