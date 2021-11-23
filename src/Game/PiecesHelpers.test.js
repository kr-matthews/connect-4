import { inBounds } from "./PiecesHelpers.js";

const keyAttributes = { rows: 6, cols: 7, lineLen: 4 };

it("Checks lines are in bounds at 0,0.", () => {
  // to the right
  expect(inBounds(0, 0, 0, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 0, 1, 0, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 2, 0, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 3, 0, 1, keyAttributes)).toBe(false);
  // upwards
  expect(inBounds(0, 0, 0, 1, 0, keyAttributes)).toBe(true);
  expect(inBounds(0, 0, 1, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 2, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 3, 1, 0, keyAttributes)).toBe(false);
  // diagonal
  expect(inBounds(0, 0, 0, 1, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 0, 1, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 2, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 3, 1, 1, keyAttributes)).toBe(false);
  // anti-diagonal
  expect(inBounds(0, 0, 0, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 1, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 2, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 0, 3, 1, -1, keyAttributes)).toBe(false);
});

it("Checks lines are in bounds at 0,1.", () => {
  // to the right
  expect(inBounds(0, 1, 0, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 1, 1, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 1, 2, 0, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 3, 0, 1, keyAttributes)).toBe(false);
  // upwards
  expect(inBounds(0, 1, 0, 1, 0, keyAttributes)).toBe(true);
  expect(inBounds(0, 1, 1, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 2, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 3, 1, 0, keyAttributes)).toBe(false);
  // diagonal
  expect(inBounds(0, 1, 0, 1, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 1, 1, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 2, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 3, 1, 1, keyAttributes)).toBe(false);
  // anti-diagonal
  expect(inBounds(0, 1, 0, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 1, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 2, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 1, 3, 1, -1, keyAttributes)).toBe(false);
});

it("Checks lines are in bounds at 0,3.", () => {
  // to the right
  expect(inBounds(0, 3, 0, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 3, 1, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 3, 2, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 3, 3, 0, 1, keyAttributes)).toBe(true);
  // upwards
  expect(inBounds(0, 3, 0, 1, 0, keyAttributes)).toBe(true);
  expect(inBounds(0, 3, 1, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 3, 2, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 3, 3, 1, 0, keyAttributes)).toBe(false);
  // diagonal
  expect(inBounds(0, 3, 0, 1, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 3, 1, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 3, 2, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 3, 3, 1, 1, keyAttributes)).toBe(false);
  // anti-diagonal
  expect(inBounds(0, 3, 0, 1, -1, keyAttributes)).toBe(true);
  expect(inBounds(0, 3, 1, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 3, 2, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 3, 3, 1, -1, keyAttributes)).toBe(false);
});

it("Checks lines are in bounds at 0,4.", () => {
  // to the right
  expect(inBounds(0, 4, 0, 0, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 1, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 4, 2, 0, 1, keyAttributes)).toBe(true);
  expect(inBounds(0, 4, 3, 0, 1, keyAttributes)).toBe(true);
  // upwards
  expect(inBounds(0, 4, 0, 1, 0, keyAttributes)).toBe(true);
  expect(inBounds(0, 4, 1, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 2, 1, 0, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 3, 1, 0, keyAttributes)).toBe(false);
  // diagonal
  expect(inBounds(0, 4, 0, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 1, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 2, 1, 1, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 3, 1, 1, keyAttributes)).toBe(false);
  // anti-diagonal
  expect(inBounds(0, 4, 0, 1, -1, keyAttributes)).toBe(true);
  expect(inBounds(0, 4, 1, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 2, 1, -1, keyAttributes)).toBe(false);
  expect(inBounds(0, 4, 3, 1, -1, keyAttributes)).toBe(false);
});
