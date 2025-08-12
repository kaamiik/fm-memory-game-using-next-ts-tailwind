import * as React from "react";
import { useRouter } from "next/navigation";

import Fieldset from "@/components/Fieldset";
import GameButton from "@/components/GameButton";
import Option from "@/components/Option";

type GameSettings = {
  theme: "numbers" | "icons";
  playersNum: "1" | "2" | "3" | "4";
  grid: "four-by-four" | "six-by-six";
};

function GameSetting({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      theme: formData.get("theme"),
      playersNum: formData.get("playersNum"),
      grid: formData.get("grid"),
    } as GameSettings;

    const params = new URLSearchParams();
    params.set("theme", data.theme);
    params.set("playersNum", data.playersNum);
    params.set("grid", data.grid);

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-[40.875rem] w-full mx-auto p-6 sm:p-14 bg-gray-lighter rounded-[10px] sm:rounded-[20px] ${className}`}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <Fieldset legend="Select Theme">
          <Option name="theme" id="numbers" label="Numbers" defaultChecked />
          <Option name="theme" id="icons" label="Icons" />
        </Fieldset>

        <Fieldset legend="Numbers of Players">
          <Option name="playersNum" id="1" label="1" defaultChecked />
          <Option name="playersNum" id="2" label="2" />
          <Option name="playersNum" id="3" label="3" />
          <Option name="playersNum" id="4" label="4" />
        </Fieldset>

        <Fieldset legend="Grid Size">
          <Option name="grid" id="4x4" defaultChecked>
            <span className="sr-only">4 by 4</span>
            <span aria-hidden="true">4x4</span>
          </Option>
          <Option name="grid" id="6x6">
            <span className="sr-only">6 by 6</span>
            <span aria-hidden="true">6x6</span>
          </Option>
        </Fieldset>
      </div>
      <GameButton className="w-full bg-yellow p-2 mt-8 text-450 sm:text-700 text-gray-lighter  hover:bg-yellow-light focus-visible:bg-yellow-light">
        Start Game
      </GameButton>
    </form>
  );
}

export default GameSetting;
