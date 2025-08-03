"use client";

import * as React from "react";
import Fieldset from "@/components/Fieldset";
import GameButton from "@/components/GameButton";
import Option from "@/components/Option";

function GameSetting({ className = "" }: { className?: string }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`max-w-[40.875rem] w-full mx-auto p-6 sm:p-14 bg-gray-lighter rounded-[10px] sm:rounded-[20px] ${className}`}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <Fieldset legend="Select Theme">
          <Option name="theme" id="numbers" label="Numbers" defaultChecked />
          <Option name="theme" id="icons" label="Icons" />
        </Fieldset>

        <Fieldset legend="Numbers of Players">
          <Option name="players-num" id="solo" label="1" defaultChecked />

          <Option name="players-num" id="two" label="2" />

          <Option name="players-num" id="three" label="3" />

          <Option name="players-num" id="four" label="4" />
        </Fieldset>

        <Fieldset legend="Grid Size">
          <Option name="grid" id="four-by-four" defaultChecked>
            <span className="sr-only">4 by 4</span>
            <span aria-hidden="true">4x4</span>
          </Option>
          <Option name="grid" id="six-by-six">
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
