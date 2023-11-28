import { FrequencyTable } from "./lib/types";
import { EOL } from "./lib/utils";

function solve(input: string[][], callback: (entries: [string, number][]) => void): void {
  for (let col = 0; col < input[0].length; col++) {
    const freqTab = new FrequencyTable<string>();
    for (let row = 0; row < input.length; row++) {
      freqTab.add(input[row][col]);
    }
    callback(freqTab.entriesByFrequency());
  }
}

function solvePart1(input: string[][]): string {
  let result = "";
  solve(input, (entries) => {
    result += entries[0][0];
  });
  return result;
}

function solvePart2(input: string[][]): string {
  let result = "";
  solve(input, (entries) => {
    result += entries[entries.length - 1][0];
  });
  return result;
}

export default async (data: string) => {
  const input = data.split(EOL).map((line) => [...line]);

  console.log(`Part 1: The result is: ${solvePart1(input)}`); // asvcbhvg is correct
  console.log(`Part 2: The result is: ${solvePart2(input)}`); // odqnikqv is correct
};
