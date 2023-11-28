import { md5, strToNum } from "./lib/utils";

function solvePart1(input: string): string {
  const MATCH_RE = /^0{5}/;
  const result: string[] = [];
  let ix = 0;
  while (result.length < 8) {
    const hash = md5(`${input}${ix}`);
    if (MATCH_RE.test(hash)) {
      result.push(hash[5]);
    }
    ix++;
  }

  return result.join("");
}

function solvePart2(input: string): string {
  const MATCH_RE = /^0{5}[0-7]/;
  const result: (string | null)[] = [null, null, null, null, null, null, null, null];
  let ix = 0;
  while (!result.every((value) => value !== null)) {
    const hash = md5(`${input}${ix}`);
    if (MATCH_RE.test(hash)) {
      let ix = strToNum(hash[5]);
      if (result[ix] === null) {
        result[ix] = hash[6];
      }
    }
    ix++;
  }

  return result.join("");
}

export default async (input: string) => {
  console.log(`Part 1: The result is: ${solvePart1(input)}`); // 801b56a7 is correct
  console.log(`Part 2: The result is: ${solvePart2(input)}`); // 424a0197 is correct
};
