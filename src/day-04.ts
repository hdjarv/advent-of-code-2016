import { FrequencyTable } from "./lib/types";
import { EOL, caesarCipher, strToNum } from "./lib/utils";

type Room = {
  encryptedName: string;
  name?: string;
  sectorId: number;
  checksum: string;
};

function parseRoom(input: string): Room {
  const PARSE_RE = /^([\w\-]+)-(\d+)\[(\w+)\]$/;
  const match = PARSE_RE.exec(input);
  if (match) {
    return {
      encryptedName: match[1],
      sectorId: strToNum(match[2]),
      checksum: match[3],
    };
  }
  throw Error(`Invalid input: ${input}`);
}

function sortFrequencyTable<T extends string>(freqTab: FrequencyTable<T>): [string, number][] {
  return [...freqTab.entries()].sort(([aKey, aCount]: [T, number], [bKey, bCount]: [T, number]) => {
    if (aCount === bCount) {
      return aKey.localeCompare(bKey);
    }

    return bCount - aCount;
  });
}

function isValidRoom(room: Room): boolean {
  const freqTab = new FrequencyTable<string>();
  freqTab.add([...room.encryptedName.replaceAll("-", "")]);
  const checksum = sortFrequencyTable(freqTab)
    .map((entry) => entry[0])
    .slice(0, 5);
  return checksum.join("") === room.checksum;
}

function solvePart1(input: Room[]): number {
  return input.filter(isValidRoom).reduce((result, room) => result + room.sectorId, 0);
}

function solvePart2(input: Room[]): number {
  const validRooms = input.filter(isValidRoom).map((room) => {
    room.name = caesarCipher(room.encryptedName.replaceAll("-", " "), room.sectorId);
    return room;
  });
  const room = validRooms.find((room) => {
    return /northpole/.test(room.name!);
  });

  if (room) {
    return room.sectorId;
  }
  throw Error("No room found for northpole object storage");
}

export default async (data: string) => {
  const input = data.split(EOL).map(parseRoom);

  console.log(`Part 1: The result is: ${solvePart1(input)}`); // 361724 is correct
  console.log(`Part 2: The result is: ${solvePart2(input)}`); // 482 is correct
};
