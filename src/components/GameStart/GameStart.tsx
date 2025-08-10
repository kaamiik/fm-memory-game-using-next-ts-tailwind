import * as React from "react";
import { useSearchParams } from "next/navigation";

import useIsGameStarted from "@/hooks/useIsGameStarted";
import PageHeader from "../PageHeader";
import CardButton from "../CardButton";
import CardGrid from "../CardGrid";

function GameStart() {
  const isGameStarted = useIsGameStarted();
  const params = useSearchParams();
  const gridSize = params.get("grid") as "4x4" | "6x6";

  if (isGameStarted) {
    return (
      <>
        <PageHeader />
        <main className="bg-gray-lighter p-6 sm:p-10 lg:p-9 xl:px-0 grid items-baseline justify-center">
          <CardGrid gridSize={gridSize} />
        </main>
      </>
    );
  }

  return null;
}

export default GameStart;
