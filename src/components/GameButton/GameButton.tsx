import * as React from "react";

function GameButton({
  children,
  className = "",
  ...delegated
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 focus-visible:outline-dotted transition-colors duration-200 ease-in-out ${className}`}
      {...delegated}
    >
      {children}
    </button>
  );
}

export default GameButton;
