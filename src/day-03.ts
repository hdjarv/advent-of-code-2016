import { EOL, sortAscending, strToNum } from "./lib/utils";

function isValidTriangle(sides: number[]): boolean {
  sides = [...sides].sort(sortAscending); // sort a copy to not change original input
  return sides[0] + sides[1] > sides[2];
}

function solvePart1(input: number[][]): number {
  return input.filter(isValidTriangle).length;
}

function solvePart2(input: number[][]): number {
  let newInput: number[][] = [];
  // transpose the input to the same format as for part 1 and reuse its functionality
  for (let col = 0; col < input[0].length; col++) {
    for (let row = 0; row < input.length; ) {
      newInput.push([input[row][col], input[row + 1][col], input[row + 2][col]]);
      row = row + 3;
    }
  }
  return solvePart1(newInput);
}

export default async (data: string) => {
  const input = data.split(EOL).map((line) => line.trim().split(/[ ]+/).map(strToNum));

  console.log(`Part 1: The result is: ${solvePart1(input)}`); // 917 is correct
  console.log(`Part 2: The result is: ${solvePart2(input)}`); // 1649 is correct
};
