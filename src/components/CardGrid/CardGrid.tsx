import * as React from "react";
import CardButton from "../CardButton";

type CardGridProps = {
  gridSize: "4x4" | "6x6";
};

function CardGrid({ gridSize }: CardGridProps) {
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
      {Array.from({ length: gridConfig.buttonCount }, (_, index) => (
        <CardButton
          key={index}
          className={`${gridConfig.fontSize}`}
        ></CardButton>
      ))}
    </div>
  );
}

export default CardGrid;
