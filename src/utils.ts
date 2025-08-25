import type { Card } from "./types/gameTypes";

export function generateCards(
  gridSize: "4x4" | "6x6",
  theme: "numbers" | "icons"
): Card[] {
  const pairCount = gridSize === "4x4" ? 8 : 18;

  if (theme === "icons") {
    const allIcons = Array.from(
      { length: 18 },
      (_, i) => `/assets/icon${i + 1}.svg`
    );
    const chosenIcons: string[] = pickUnique(allIcons, pairCount);
    const paired = [...chosenIcons, ...chosenIcons];
    const shuffled = shuffle(paired);
    console.log(shuffled);
    return shuffled.map((value, index) => ({
      id: `card-${index + 1}`,
      value,
      isFlipped: false,
      isMatched: false,
    }));
  }

  // numbers
  const numbers: number[] = [];
  while (numbers.length < pairCount) {
    const num = Math.floor(Math.random() * 50) + 1;
    if (!numbers.includes(num)) numbers.push(num);
  }
  const pairedNumbers = [...numbers, ...numbers];
  const shuffled = shuffle(pairedNumbers);
  console.log(shuffled);
  return shuffled.map((value, index) => ({
    id: `card-${index + 1}`,
    value,
    isFlipped: false,
    isMatched: false,
  }));
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickUnique<T>(arr: T[], count: number): T[] {
  const copy = shuffle(arr);
  return copy.slice(0, count);
}
