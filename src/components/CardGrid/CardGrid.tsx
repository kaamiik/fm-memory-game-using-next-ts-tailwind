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

  const is4x4 = gridSize === '4x4';
  const cols = is4x4 ? 4 : 6;
  const rows = is4x4 ? 4 : 6;

  const gridConfig = is4x4
    ? {
        cols: 'grid-cols-(--my-grid-4x4)',
        gap: 'gap-3 sm:gap-5',
        maxWidth: 'max-w-[33.25rem]',
        margin: 'mt-8 sm:mt-20 lg:mt-0',
        fontSize: 'text-800 sm:text-950',
      }
    : {
        cols: 'grid-cols-(--my-grid-6x6)',
        gap: 'gap-2.5 sm:gap-4',
        maxWidth: 'max-w-[35.75rem]',
        margin: 'mt-8 sm:mt-10 lg:mt-0',
        fontSize: 'text-600 sm:text-850',
      };

  const iconSize = is4x4 ? 56 : 40;

  function handleKeyDown(event: React.KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (!target.matches('[data-cell-index]')) return;

    const currentIndex = parseInt(
      target.getAttribute('data-cell-index') || '0'
    );
    const currentRow = Math.floor(currentIndex / cols);
    const currentCol = currentIndex % cols;
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if (currentCol < cols - 1) {
          newIndex = currentIndex + 1;
        } else if (currentRow < rows - 1) {
          // Wrap to first cell of next row
          newIndex = (currentRow + 1) * cols;
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (currentCol > 0) {
          newIndex = currentIndex - 1;
        } else if (currentRow > 0) {
          // Wrap to last cell of previous row
          newIndex = currentRow * cols - 1;
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (currentRow < rows - 1) {
          newIndex = currentIndex + cols;
        } else if (currentCol < cols - 1) {
          const nextCol = (currentCol + 1) % cols;
          newIndex = nextCol; // row 0, next column
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (currentRow > 0) {
          newIndex = currentIndex - cols;
        } else if (currentCol > 0) {
          const prevCol = (currentCol - 1 + cols) % cols;
          newIndex = prevCol + (rows - 1) * cols; // last row, previous column
        }
        break;

      case 'Home':
        event.preventDefault();
        if (event.ctrlKey) {
          // Ctrl+Home: first cell in grid
          newIndex = 0;
        } else {
          // Home: first cell in current row
          newIndex = currentRow * cols;
        }
        break;

      case 'End':
        event.preventDefault();
        if (event.ctrlKey) {
          // Ctrl+End: last cell in grid
          newIndex = cards.length - 1;
        } else {
          // End: last cell in current row
          newIndex = currentRow * cols + (cols - 1);
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
      aria-rowcount={rows}
      aria-colcount={cols}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      className={`mx-auto grid ${gridConfig.cols} ${gridConfig.gap} ${gridConfig.maxWidth} ${gridConfig.margin}`}
    >
      {cards.map((card, index) => {
        const rowIndex = Math.floor(index / cols);
        const colIndex = index % cols;

        const isIcons = typeof card.value === 'string';
        const iconAlt = isIcons ? getIconAlt(card.value as string) : '';

        const cardContent = card.isMatched
          ? `${isIcons ? iconAlt : card.value}, matched`
          : card.isFlipped
            ? `${isIcons ? iconAlt : card.value}, face up`
            : 'face down';

        return (
          <CardButton
            key={card.id}
            role="gridcell"
            aria-rowindex={rowIndex + 1}
            aria-colindex={colIndex + 1}
            aria-selected={card.isFlipped || card.isMatched}
            data-cell-index={index}
            tabIndex={index === 0 ? 0 : -1}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            className={gridConfig.fontSize}
            srText={cardContent}
            onClick={() => onCardClick(card)}
          >
            {card.isFlipped || card.isMatched ? (
              typeof card.value === 'number' ? (
                card.value
              ) : (
                <span
                  className={`${
                    isIcons && !is4x4 ? 'p-1.5' : 'p-4'
                  } relative inline-block`}
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
  );
}

export default CardGrid;
