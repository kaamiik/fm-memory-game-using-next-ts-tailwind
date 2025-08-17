import * as React from "react";
import CardButton from "../CardButton";

import type { Card } from "@/types/gameTypes";

type CardGridProps = {
  gridSize: "4x4" | "6x6";
  cards: Card[];
  onCardClick: (card: Card) => void;
};

function CardGrid({ gridSize, cards, onCardClick }: CardGridProps) {
  const is4x4 = gridSize === "4x4";

  const gridConfig = is4x4
    ? {
        cols: "grid-cols-(--my-grid-4x4)",
        gap: "gap-3 sm:gap-5",
        maxWidth: "max-w-[33.25rem]",
        buttonCount: 16,
        margin: "mt-8 sm:mt-20 lg:mt-0",
        fontSize: "text-800 sm:text-950",
      }
    : {
        cols: "grid-cols-(--my-grid-6x6)",
        gap: "gap-2.5 sm:gap-4",
        maxWidth: "max-w-[35.75rem]",
        buttonCount: 36,
        margin: "mt-8 sm:mt-10 lg:mt-0",
        fontSize: "text-600 sm:text-850",
      };

  return (
    <div
      className={`grid mx-auto ${gridConfig.cols} ${gridConfig.gap} ${gridConfig.maxWidth} ${gridConfig.margin}`}
    >
      {cards.map((card) => (
        <CardButton
          key={card.id}
          className={gridConfig.fontSize}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card)}
        >
          {card.isFlipped || card.isMatched ? card.value : ""}
        </CardButton>
      ))}
    </div>
  );
}

export default CardGrid;
