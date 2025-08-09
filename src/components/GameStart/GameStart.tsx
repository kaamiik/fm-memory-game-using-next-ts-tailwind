import * as React from "react";

import useIsGameStarted from "@/hooks/useIsGameStarted";
import PageHeader from "../PageHeader";

function GameStart() {
  const isGameStarted = useIsGameStarted();

  if (isGameStarted) {
    return (
      <>
        <PageHeader />
        <main className="bg-gray-lighter min-h-dvh p-6 sm:py-12 flex flex-col justify-center">
          <h1 className="text-700 sm:text-800 text-center">start gaming...</h1>
        </main>
      </>
    );
  }

  return null;
}

export default GameStart;
