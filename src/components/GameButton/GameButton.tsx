import * as React from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

type GameButtonProps = {
  children: React.ReactNode;
  className?: string;
} & (
  | ({ href: LinkProps["href"] } & Omit<LinkProps, "href">)
  | ({ href?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

function GameButton({
  href,
  children,
  className,
  ...delegated
}: GameButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 focus-visible:outline-dotted transition-colors duration-200 ease-in-out ${
          className ?? ""
        }`}
        {...(delegated as Omit<LinkProps, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1 focus-visible:outline-dotted transition-colors duration-200 ease-in-out ${
        className ?? ""
      }`}
      {...(delegated as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export default GameButton;
