import { renderHook, act } from "@testing-library/react-hooks";

import { useGame } from "./useGame.js";

// helpers

function validStates(states) {
  // only returns the 6 expected consts and functions
  expect(Object.keys(states)).toHaveLength(6);

  // test each of the 6
  expect(states).toHaveProperty("gameStatus");
  expect(["ongoing", 0, 1, "draw"]).toContain(states.gameStatus);

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
    expect(move.row).toBeGreaterThanOrEqual(0);
    expect(move.row).toBeLessThanOrEqual(5);
    expect(move.col).toBeGreaterThanOrEqual(0);
    expect(move.col).toBeLessThanOrEqual(6);
  });

  expect(states).toHaveProperty("resetGame");
  expect(states.resetGame).toBeFunction;

  expect(states).toHaveProperty("placePiece");
  expect(states.placePiece).toBeFunction;
}

function isEmpty(board) {
  board.forEach((row, i) => {
    row.forEach((entry, j) => {
      expect(entry.player).toBeNull();
      expect(entry.inLine).toBe(false);
    });
  });
}

function isInitialState(states, player) {
  expect(states.gameStatus).toBe("ongoing");
  expect(states.toPlayNext).toBe(player);
  isEmpty(states.board);
  expect(states.moveHistory).toEqual([]);
}

// tests

it("useGame initial states valid", () => {
  const initialPlayer = 1;
  const { result } = renderHook(() => useGame(initialPlayer));

  validStates(result.current);
  isInitialState(result.current, initialPlayer);
});

it("useGame states remain valid after (redundant) reset", () => {
  const initialPlayer = 0;
  const { result } = renderHook(() => useGame(initialPlayer));

  act(() => result.current.resetGame(0));
  validStates(result.current);
  isInitialState(result.current, 0);

  act(() => result.current.resetGame(1));
  validStates(result.current);
  isInitialState(result.current, 1);
});

it("useGame states remain valid after playing first piece", () => {
  const initialPlayer = 1;
  const col = 4;
  const { result } = renderHook(() => useGame(initialPlayer));

  // place piece in column col
  act(() => result.current.placePiece(result.current.toPlayNext, col));
  validStates(result.current);
  expect(result.current.gameStatus).toBe("ongoing");
  result.current.board.forEach((row, i) => {
    row.forEach((entry, j) => {
      if (i === 0 && j === col) {
        expect(entry.player).toBe(1 - result.current.toPlayNext);
      } else {
        expect(entry.player).toBeNull();
      }
    });
  });
});

it("useGame states remain valid bewteen/after 3 moves then reset", () => {
  const initialPlayer = 0;
  const col = 3;
  const { result } = renderHook(() => useGame(initialPlayer));
  const initialState = result.current;

  // place piece in column col
  act(() => result.current.placePiece(result.current.toPlayNext, col));
  validStates(result.current);

  // place piece in another column (2 over from col)
  act(() =>
    result.current.placePiece(result.current.toPlayNext, (col + 2) % 7)
  );
  validStates(result.current);

  // place piece in latter column
  act(() =>
    result.current.placePiece(result.current.toPlayNext, (col + 2) % 7)
  );
  validStates(result.current);

  // check board matches the 3 pieces placed
  expect(result.current.gameStatus).toBe("ongoing");
  result.current.board.forEach((row, i) => {
    row.forEach((entry, j) => {
      if ((i === 0 && j === col) || (i === 1 && j === (col + 2) % 7)) {
        expect(entry.player).toBe(initialPlayer);
      } else if (i === 0 && j === (col + 2) % 7) {
        expect(entry.player).toBe(1 - initialPlayer);
      } else {
        expect(entry.player).toBeNull();
      }
    });
  });

  // reset board
  act(() => result.current.resetGame(1 - initialPlayer));
  validStates(result.current);
  isInitialState(result.current, 1 - initialPlayer);
});

// TODO: add tests for wins, loses, and draws
// TODO: test moveHistory (unless it gets replaced with an undo function)
