import React from "react";

import GameSetting from "@/components/GameSetting";
import GameStart from "@/components/GameStart";

type HomeSearch = {
  theme?: string;
  playersNum?: string;
  grid?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<HomeSearch>;
}) {
  const sp = await searchParams;
  const theme =
    sp.theme === "icons"
      ? "icons"
      : sp.theme === "numbers"
      ? "numbers"
      : undefined;
  const playersNum = ["1", "2", "3", "4"].includes(String(sp.playersNum))
    ? (Number(sp.playersNum) as 1 | 2 | 3 | 4)
    : undefined;
  const gridSize =
    sp.grid === "6x6" ? "6x6" : sp.grid === "4x4" ? "4x4" : undefined;

  const isGameStarted = !!theme && !!playersNum && !!gridSize;

  return (
    <>
      {isGameStarted ? (
        <GameStart theme={theme} playersNum={playersNum} gridSize={gridSize} />
      ) : (
        <GameSetting />
      )}
    </>
  );
}
