import * as React from "react";

type CardProps = {
  isFlipped?: boolean;
  isMatched?: boolean;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function CardButton({
  isFlipped = false,
  isMatched = false,
  children,
  className = "",
  ...delegated
}: CardProps) {
  return (
    <button
      type="button"
      className={`w-full aspect-square rounded-full text-gray-lighter bg-blue-dark cursor-pointer hover:bg-blue-medium focus-visible:bg-blue-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-1 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...delegated}
    >
      {children}
    </button>
  );
}

export default CardButton;
