import { renderHook, act } from "@testing-library/react-hooks";

import { useGame } from "./useGame.js";

function validStates(states) {
  // only returns the 6 expected consts and functions
  expect(Object.keys(states)).toHaveLength(6);

  // test each of the 6
  expect(states).toHaveProperty("gameStatus");
  expect(["ongoing", "won", "lost", "draw"]).toContain(states.gameStatus);

  expect(states).toHaveProperty("toPlayNext");
  expect([0, 1]).toContain(states.toPlayNext);

  expect(states).toHaveProperty("board");
  expect(states.board).toHaveLength(6);
  states.board.forEach((row) => {
    expect(row).toHaveLength(7);
    row.forEach((entry) => {
      expect(Object.keys(entry)).toHaveLength(2);
      expect(entry).toHaveProperty("player");
      expect([0, 1, null]).toContain(entry.player);
      expect(entry).toHaveProperty("inLine");
      expect([true, false]).toContain(entry.inLine);
    });
  });

  expect(states).toHaveProperty("moveHistory");
  expect(states.moveHistory).toBeInstanceOf(Array);
  states.moveHistory.forEach((move) => {
    expect(Object.keys(move)).toHaveLength(3);
    expect([0, 1]).toContain(move.player);
    expect(move.row).toBeBetween(0, 5);
    expect(move.col).toBeBetween(0, 6);
  });

  expect(states).toHaveProperty("resetGame");
  expect(states.resetGame).toBeFunction;

  expect(states).toHaveProperty("placePiece");
  expect(states.placePiece).toBeFunction;
}

it("useGame initial states valid", () => {
  const toPlayNext = 1;
  const { result } = renderHook(() => useGame(toPlayNext));

  validStates(result.current);
  expect(result.current.toPlayNext).toBe(toPlayNext);
});

it("useGame states remain valid after (redundant) reset", () => {
  const toPlayNext = 0;
  const { result } = renderHook(() => useGame(toPlayNext));

  act(() => result.current.resetGame(0));
  validStates(result.current);
  expect(result.current.toPlayNext).toBe(0);

  act(() => result.current.resetGame(1));
  validStates(result.current);
  expect(result.current.toPlayNext).toBe(1);
});

it("useGame states remain valid after playing first piece", () => {
  // TODO: Add tests for playing piece in useGame hook
  console.log("Warning: Test incomplete");
});

it("useGame states remain valid after move then reset", () => {
  // TODO: Add tests for playing piece then reset in useGame hook
  console.log("Warning: Test incomplete");
});
