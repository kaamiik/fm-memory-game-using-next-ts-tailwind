import * as React from 'react';
import Image from 'next/image';
import CardButton from '../CardButton';
import type { Card } from '@/types/gameTypes';
import { getIconAlt } from '@/utils';

type CardGridProps = {
  gridSize: '4x4' | '6x6';
  cards: Card[];
  onCardClick: (card: Card) => void;
};

function CardGrid({ gridSize, cards, onCardClick }: CardGridProps) {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const is4x4Grid = gridSize === '4x4';
  const columnCount = is4x4Grid ? 4 : 6;
  const rowCount = is4x4Grid ? 4 : 6;

  const gridConfig = is4x4Grid
    ? {
        gridColumns: 'grid-cols-(--my-grid-4x4)',
        gap: 'gap-3 sm:gap-5',
        maxWidth: 'max-w-[33.25rem]',
        margin: 'mt-8 sm:mt-20 lg:mt-0',
        fontSize: 'text-800 sm:text-950',
      }
    : {
        gridColumns: 'grid-cols-(--my-grid-6x6)',
        gap: 'gap-2.5 sm:gap-4',
        maxWidth: 'max-w-[35.75rem]',
        margin: 'mt-8 sm:mt-10 lg:mt-0',
        fontSize: 'text-600 sm:text-850',
      };

  const iconSize = is4x4Grid ? 56 : 40;

  function handleKeyDown(event: React.KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (!target.matches('[data-cell-index]')) return;

    const currentIndex = parseInt(
      target.getAttribute('data-cell-index') || '0'
    );
    const currentRow = Math.floor(currentIndex / columnCount);
    const currentColumn = currentIndex % columnCount;
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if (currentColumn < columnCount - 1) {
          newIndex = currentIndex + 1;
        } else if (currentRow < rowCount - 1) {
          newIndex = (currentRow + 1) * columnCount;
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (currentColumn > 0) {
          newIndex = currentIndex - 1;
        } else if (currentRow > 0) {
          newIndex = currentRow * columnCount - 1;
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (currentRow < rowCount - 1) {
          newIndex = currentIndex + columnCount;
        } else if (currentColumn < columnCount - 1) {
          newIndex = (currentColumn + 1) % columnCount;
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (currentRow > 0) {
          newIndex = currentIndex - columnCount;
        } else if (currentColumn > 0) {
          newIndex =
            ((currentColumn - 1 + columnCount) % columnCount) +
            (rowCount - 1) * columnCount;
        }
        break;

      case 'Home':
        event.preventDefault();
        if (event.ctrlKey) {
          newIndex = 0;
        } else {
          newIndex = currentRow * columnCount;
        }
        break;

      case 'End':
        event.preventDefault();
        if (event.ctrlKey) {
          newIndex = cards.length - 1;
        } else {
          newIndex = currentRow * columnCount + (columnCount - 1);
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        const card = cards[currentIndex];
        if (card && !card.isFlipped && !card.isMatched) {
          onCardClick(card);
        }
        return;
    }

    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex <= cards.length - 1
    ) {
      const newButton = gridRef.current?.querySelector(
        `[data-cell-index="${newIndex}"]`
      ) as HTMLButtonElement;
      if (newButton) {
        (target as HTMLButtonElement).setAttribute('tabindex', '-1');
        newButton.setAttribute('tabindex', '0');
        newButton.focus();
      }
    }
  }

  function handleFocus(event: React.FocusEvent) {
    const target = event.target as HTMLElement;
    if (!target.matches('[data-cell-index]')) return;
    const buttons =
      gridRef.current?.querySelectorAll<HTMLButtonElement>('[data-cell-index]');
    if (!buttons) return;
    buttons.forEach((btn) => btn.setAttribute('tabindex', '-1'));
    (target as HTMLButtonElement).setAttribute('tabindex', '0');
  }

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label={`Memory game grid, ${gridSize.replace('x', ' by ')}, ${cards.length} cards total`}
      aria-rowcount={rowCount}
      aria-colcount={columnCount}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      className={`mx-auto grid ${gridConfig.gridColumns} ${gridConfig.gap} ${gridConfig.maxWidth} ${gridConfig.margin}`}
    >
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          role="row"
          className="col-span-full grid grid-cols-subgrid"
        >
          {Array.from({ length: columnCount }).map((__, columnIndex) => {
            const cardIndex = rowIndex * columnCount + columnIndex;
            const card = cards[cardIndex];
            if (!card) return null;

            const isIconCard = typeof card.value === 'string';
            const iconAlt = isIconCard ? getIconAlt(card.value as string) : '';
            const cardContent = card.isMatched
              ? `${isIconCard ? iconAlt : card.value}, matched`
              : card.isFlipped
                ? `${isIconCard ? iconAlt : card.value}, face up`
                : 'face down';

            return (
              <CardButton
                key={card.id}
                role="gridcell"
                aria-rowindex={rowIndex + 1}
                aria-colindex={columnIndex + 1}
                aria-selected={card.isFlipped || card.isMatched}
                aria-label={cardContent}
                data-cell-index={cardIndex}
                tabIndex={cardIndex === 0 ? 0 : -1}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                className={gridConfig.fontSize}
                onClick={() => onCardClick(card)}
              >
                {card.isFlipped || card.isMatched ? (
                  typeof card.value === 'number' ? (
                    card.value
                  ) : (
                    <span
                      className={`${isIconCard && !is4x4Grid ? 'p-1.5' : 'p-4'} relative inline-block`}
                    >
                      <Image
                        src={card.value}
                        alt=""
                        width={iconSize}
                        height={iconSize}
                      />
                    </span>
                  )
                ) : (
                  ''
                )}
              </CardButton>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
