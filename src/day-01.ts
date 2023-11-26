import { taxicabWalk, Move, Direction } from "./lib/taxicab-walker";
import { strToNum } from "./lib/utils";

function parseTurn(input: string): Direction.Right | Direction.Left {
  return input.charAt(0) === "R" ? Direction.Right : Direction.Left;
}

function solvePart1(input: Move[]): number {
  let xPos = 0,
    yPos = 0;
  taxicabWalk(input, (x, y, dir) => {
    xPos = x;
    yPos = y;
  });

  return Math.abs(xPos) + Math.abs(yPos);
}

function solvePart2(input: Move[]): number {
  let xPos = 0,
    yPos = 0;
  const visitedLocations = new Set<string>();
  taxicabWalk(input, (x, y, dir) => {
    xPos = x;
    yPos = y;
    let key = `${x}:${y}`;
    if (visitedLocations.has(key)) {
      return false;
    }
    visitedLocations.add(key);
  });

  return Math.abs(xPos) + Math.abs(yPos);
}

export default async (input: string) => {
  const data: Move[] = input.split(", ").map((s) => ({ turn: parseTurn(s), steps: strToNum(s.slice(1)) }));

  console.log(`Part 1: The result is: ${solvePart1(data)}`); // 230 is correct
  console.log(`Part 2: The result is: ${solvePart2(data)}`); // 154 is correct
};
