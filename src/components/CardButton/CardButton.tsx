import { Span } from "next/dist/trace";
import * as React from "react";

type CardProps = {
  isFlipped?: boolean;
  isMatched?: boolean;
  children?: React.ReactNode;
  srText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function CardButton({
  isFlipped = false,
  isMatched = false,
  children,
  className = "",
  srText,
  ...delegated
}: CardProps) {
  return (
    <button
      type="button"
      aria-live="polite"
      className={`relative w-full grid aspect-square cursor-pointer rounded-full focus-visible:outline-4 focus-visible:outline-blue-500 focus-visible:outline-offset-1 focus-visible:outline-dotted
        motion-safe:transition-transform motion-safe:duration-500 motion-safe:transform-3d
        motion-reduce:transition-none motion-reduce:duration-0 motion-reduce:transform-none
        ${isFlipped ? "motion-safe:rotate-y-180" : ""}
        motion-reduce:rotate-0
        ${className}`}
      {...delegated}
    >
      <div
        className={`absolute inset-0 rounded-full grid place-content-center bg-blue-dark
          ${
            !isFlipped && !isMatched
              ? "hover:bg-blue-medium focus-visible:bg-blue-medium"
              : ""
          }
          motion-safe:backface-hidden
          ${isFlipped ? "motion-reduce:hidden" : "motion-reduce:grid"}`}
      />
      <div
        className={`absolute inset-0 text-gray-lighter rounded-full grid place-content-center
          ${isMatched ? "bg-blue-light" : "bg-yellow"}
          motion-safe:backface-hidden motion-safe:rotate-y-180 motion-reduce:rotate-0
          ${isFlipped ? "motion-reduce:grid" : "motion-reduce:hidden"}`}
      >
        {children}
      </div>

      {srText ? <span className="sr-only">{srText}</span> : null}
    </button>
  );
}

export default CardButton;
