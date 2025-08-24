import * as React from "react";

type CardProps = {
  isFlipped?: boolean;
  isMatched?: boolean;
  isIcons?: boolean;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function CardButton({
  isFlipped = false,
  isMatched = false,
  isIcons = false,
  children,
  className = "",
  ...delegated
}: CardProps) {
  return (
    <button
      type="button"
      className={`relative w-full aspect-square cursor-pointer rounded-full transition-transform duration-500 transform-3d ${
        isFlipped ? "rotate-y-180" : ""
      } ${className}`}
      {...delegated}
    >
      <div
        className={`absolute ${
          isIcons && "p-1.5"
        } inset-0 rounded-full flex items-center justify-center bg-blue-dark ${
          !isFlipped && !isMatched
            ? "hover:bg-blue-medium focus-visible:bg-blue-medium"
            : ""
        } backface-hidden`}
      />
      <div
        className={`absolute ${
          isIcons && "p-1.5"
        } inset-0 text-gray-lighter rounded-full flex items-center justify-center ${
          isMatched ? "bg-blue-light" : "bg-yellow"
        } backface-hidden rotate-y-180`}
      >
        {children}
      </div>
    </button>
  );
}

export default CardButton;
