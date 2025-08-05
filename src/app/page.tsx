"use client";

import React from "react";

import { useSearchParams } from "next/navigation";
import GameSetting from "@/components/GameSetting";

function Home() {
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

  return (
    <main className="bg-blue-darker min-h-dvh p-6 sm:py-12 flex flex-col gap-11 sm:gap-[4.6875rem] justify-center">
      <h1 className="text-700 sm:text-800 text-gray-lighter text-center">
        memory<span className="sr-only"> game</span>
      </h1>
      <GameSetting />
    </main>
  );
}

export default Home;
