import type { Card } from "./types/gameTypes";

export function generateCards(gridSize: "4x4" | "6x6"): Card[] {
  const pairCount = gridSize === "4x4" ? 8 : 18;

  const numbers: number[] = [];
  while (numbers.length < pairCount) {
    const num = Math.floor(Math.random() * 50) + 1;
    if (!numbers.includes(num)) numbers.push(num);
  }

  const pairedNumbers = [...numbers, ...numbers];

  const shuffled = [...pairedNumbers].sort(() => Math.random() - 0.5);

  console.log(shuffled);

  return shuffled.map((value, index) => ({
    id: `card-${index + 1}`,
    value,
    isFlipped: false,
    isMatched: false,
  }));
}
