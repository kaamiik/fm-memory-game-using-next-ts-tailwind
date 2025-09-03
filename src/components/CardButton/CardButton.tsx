import * as React from 'react';

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
  className = '',
  srText,
  ...delegated
}: CardProps) {
  return (
    <button
      type="button"
      className={`relative grid aspect-square w-full cursor-pointer rounded-full focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-blue-500 focus-visible:outline-dotted motion-safe:transition-transform motion-safe:duration-500 motion-safe:transform-3d motion-reduce:transform-none motion-reduce:transition-none motion-reduce:duration-0 ${isFlipped ? 'motion-safe:rotate-y-180' : ''} motion-reduce:rotate-0 ${className}`}
      {...delegated}
    >
      {/* Back Face */}
      <div
        className={`bg-blue-dark absolute inset-0 grid place-content-center rounded-full ${
          !isFlipped && !isMatched
            ? 'hover:bg-blue-medium focus-visible:bg-blue-medium'
            : ''
        } motion-safe:backface-hidden ${isFlipped ? 'motion-reduce:hidden' : 'motion-reduce:grid'}`}
      />
      {/* Front Face */}
      <div
        className={`text-gray-lighter absolute inset-0 grid place-content-center rounded-full ${isMatched ? 'bg-blue-light' : 'bg-yellow'} motion-safe:rotate-y-180 motion-safe:backface-hidden motion-reduce:rotate-0 ${isFlipped ? 'motion-reduce:grid' : 'motion-reduce:hidden'}`}
      >
        {children}
      </div>

      {srText && <span className="sr-only">{srText}</span>}
    </button>
  );
}

export default CardButton;
