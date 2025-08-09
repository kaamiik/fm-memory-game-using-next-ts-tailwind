"use client";
import React from "react";

import GameSetting from "@/components/GameSetting";
import GameStart from "@/components/GameStart";
import useIsGameStarted from "@/hooks/useIsGameStarted";

function HomeContent() {
  const isGameStarted = useIsGameStarted();

  return (
    <>
      <GameStart />
      {!isGameStarted && (
        <main className="bg-blue-darker min-h-dvh p-6 sm:py-12 flex flex-col gap-11 sm:gap-[4.6875rem] justify-center">
          <h1 className="text-700 sm:text-800 text-gray-lighter text-center">
            memory<span className="sr-only"> game</span>
          </h1>
          <GameSetting />
        </main>
      )}
    </>
  );
}

function Home() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </React.Suspense>
  );
}

export default Home;
