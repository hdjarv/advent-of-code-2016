export type Move = {
  turn: Direction.Right | Direction.Left;
  steps: number;
};

export enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}

// If the callback return false, then the walking is aborted
export type TaxicabWalkCallback = (x: number, y: number, direction: Direction) => void | false;

export function taxicabWalk(input: Move[], callback: TaxicabWalkCallback) {
  let x = 0,
    y = 0,
    dir: Direction = Direction.Up;
  if (callback(x, y, dir) === false) return;
  for (let move of input) {
    let xDelta = 0,
      yDelta = 0;
    switch (move.turn) {
      case Direction.Left:
        switch (dir) {
          case Direction.Up:
            dir = Direction.Left;
            xDelta = -1;
            break;
          case Direction.Left:
            dir = Direction.Down;
            yDelta = 1;
            break;
          case Direction.Down:
            dir = Direction.Right;
            xDelta = 1;
            break;
          case Direction.Right:
            dir = Direction.Up;
            yDelta = -1;
            break;
        }
        break;
      case Direction.Right:
        switch (dir) {
          case Direction.Up:
            dir = Direction.Right;
            xDelta = 1;
            break;
          case Direction.Right:
            dir = Direction.Down;
            yDelta = 1;
            break;
          case Direction.Down:
            dir = Direction.Left;
            xDelta = -1;
            break;
          case Direction.Left:
            dir = Direction.Up;
            yDelta = -1;
            break;
        }
        break;
    }
    for (let i = 0; i < move.steps; i++) {
      x += xDelta;
      y += yDelta;
      if (callback(x, y, dir) === false) return;
    }
  }
}
