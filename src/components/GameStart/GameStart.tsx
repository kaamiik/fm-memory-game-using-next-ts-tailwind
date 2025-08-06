import * as React from "react";

import { useSearchParams } from "next/navigation";

function GameStart() {
  const searchParams = useSearchParams();
  const isGameStarted =
    searchParams.get("theme") &&
    searchParams.get("playersNum") &&
    searchParams.get("grid");

  if (isGameStarted) {
    console.log("Game Settings from URL:");
    console.log("Theme:", searchParams.get("theme"));
    console.log("Players:", searchParams.get("playersNum"));
    console.log("Grid:", searchParams.get("grid"));

    return (
      <main className="bg-gray-lighter min-h-dvh p-6 sm:py-12 flex flex-col justify-center">
        <h1 className="text-700 sm:text-800 text-center">start gaming...</h1>
      </main>
    );
  }

  return null;
}

export default GameStart;
