import { EOL } from "./lib/utils";

const KEYPAD_1 = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

const KEYPAD_2 = [
  ["", "", "1", "", ""],
  ["", "2", "3", "4", ""],
  ["5", "6", "7", "8", "9"],
  ["", "A", "B", "C", ""],
  ["", "", "D", "", "", ""],
];

function getStartPos(startNo: string, keypad: string[][]): [number, number] {
  for (let line = 0; line < keypad.length; line++) {
    for (let col = 0; col < keypad[line].length; col++) {
      if (keypad[line][col] === startNo) return [line, col];
    }
  }
  throw Error("startNo not found");
}

function getKeyPadNumber(startNo: string, codes: string[], keypad: string[][]): string {
  let [line, col] = getStartPos(startNo, keypad);
  for (let code of codes) {
    switch (code) {
      case "U":
        line = line > 0 && keypad[line - 1][col] !== "" ? line - 1 : line;
        break;
      case "D":
        line = line < keypad.length - 1 && keypad[line + 1][col] !== "" ? line + 1 : line;
        break;
      case "L":
        col = col > 0 && keypad[line][col - 1] !== "" ? col - 1 : col;
        break;
      case "R":
        col = col < keypad[line].length - 1 && keypad[line][col + 1] !== "" ? col + 1 : col;
        break;
    }
  }
  return keypad[line][col];
}

function getKeyPadCode(input: string[][], keypad: string[][]): string {
  const result: string[] = [];
  for (let codes of input) {
    result.push(getKeyPadNumber(result.length > 0 ? result[result.length - 1] : "5", codes, keypad));
  }
  return result.join("");
}

function solvePart1(input: string[][]): string {
  return getKeyPadCode(input, KEYPAD_1);
}

function solvePart2(input: string[][]): string {
  return getKeyPadCode(input, KEYPAD_2);
}

export default async (data: string) => {
  const input = data.split(EOL).map((line) => line.split(""));

  console.log(`Part 1: The result is: ${solvePart1(input)}`); // 44558 is correct
  console.log(`Part 2: The result is: ${solvePart2(input)}`); // 6BBAD is correct
};
