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
  const is4x4 = gridSize === '4x4';

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
  const cols = is4x4 ? 4 : 6;

  return (
    <div
      className={`mx-auto grid ${gridConfig.cols} ${gridConfig.gap} ${gridConfig.maxWidth} ${gridConfig.margin}`}
    >
      {cards.map((card, index) => {
        const number = index + 1;
        const row = Math.floor(index / cols) + 1;
        const column = (index % cols) + 1;

        const isIcons = typeof card.value === 'string';
        const iconAlt = isIcons ? getIconAlt(card.value as string) : '';

        const srText =
          !card.isFlipped && !card.isMatched
            ? `Number ${number} row ${row} column ${column}, face down`
            : card.isMatched
              ? `Number ${number}, ${iconAlt} row ${row} column ${column}, matched`
              : isIcons
                ? `Number ${number}, ${iconAlt} row ${row} column ${column}, face up`
                : `Number ${number} row ${row} column ${column}, face up`;
        return (
          <CardButton
            key={card.id}
            className={gridConfig.fontSize}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            srText={srText}
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
