export type Card = {
  id: string;
  value: number | string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type Player = {
  id: 1 | 2 | 3 | 4;
  score: number;
};
