import { createHash } from "crypto";
import { existsSync as fileExists, PathLike, readFile as _readFile } from "fs";
import { EOL } from "os";
import { basename, extname, join } from "path";
import { promisify } from "util";

export { basename, EOL, extname, fileExists, join };

export const readFile = promisify(_readFile);
export const readFileAsString = async (path: PathLike) => await readFile(path, { encoding: "utf8" });

export const numToStr = (n: number): string => `${n}`;
export const strToNum = (s: string): number => Number.parseInt(s, 10);

export const splitStringIntoNumberArray = (s: string, sep: string = ","): number[] => s.split(sep).map(strToNum);

export const findMinMaxInRange = (
  numbers: number[],
  start: number = 0,
  end: number = numbers.length
): { min: number; max: number } => {
  let min = Number.MAX_VALUE,
    max = Number.MIN_VALUE;
  for (let i = start; i < end; i++) {
    if (numbers[i] < min) min = numbers[i];
    if (numbers[i] > max) max = numbers[i];
  }
  return { min, max };
};

export const removeDuplicatesFromArray = <T>(array: T[]): T[] =>
  array.filter((value, index, input) => input.indexOf(value) === index);

export const multiplyRange = (numbers: number[], start: number = 0, end: number = numbers.length): number => {
  let result = 1;
  for (let i = start; i < end; i++) {
    result *= numbers[i];
  }

  return result;
};

export const sumRange = (numbers: number[], start: number = 0, end: number = numbers.length): number => {
  let result = 0;
  for (let i = start; i < end; i++) {
    result += numbers[i];
  }

  return result;
};

export const sortAscending = (a: number, b: number): number => a - b;
export const sortDescending = (a: number, b: number): number => b - a;

export function caesarCipher(encrypted: string, rotations: number): string {
  const lcAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const ucAlphabet = lcAlphabet.toUpperCase();
  let result = "";
  // with rotations over the number of letters in alphabet, use remainder instead
  const shift = rotations > lcAlphabet.length ? rotations % lcAlphabet.length : rotations;
  for (let c of [...encrypted]) {
    let alphabet = lcAlphabet;
    let alphabetIx = alphabet.indexOf(c);
    if (alphabetIx === -1) {
      alphabet = ucAlphabet; // try-with uppercase instead
      alphabetIx = alphabet.indexOf(c);
      if (alphabetIx === -1) {
        result += c; // keep other characters as is
        continue;
      }
    }
    let newAlphabetIx = alphabetIx + shift;
    if (newAlphabetIx >= alphabet.length) {
      newAlphabetIx -= alphabet.length;
    }
    result += alphabet[newAlphabetIx];
  }

  return result;
}

export function md5(input: string): string {
  return createHash("md5").update(input).digest("hex");
}
