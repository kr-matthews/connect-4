import { renderHook, act } from "@testing-library/react-hooks";

import { useGame } from "./useGame.js";

// NOTE: hook used to return moveHistory, so those were commented out

// TODO: TEST: useGame: expand coverage of custom hook tests:
//  add checks to current tests for winner, highlights in positions, prevMove, toPlayFirst, ...
//  add tests for resetGame, startGame, setForfeiter
//  add tests for diagonal and anti-diagonal wins
//  add tests for win on 42nd piece placed (ie filling up positions but no draw)
//  add tests for undo action (if/when it is added)

// helpers

function validStates(states) {
  // test each of them
  expect(states).toHaveProperty("boardStats");
  expect(states.boardStats).toHaveProperty("positions");
  expect(states.boardStats.positions).toHaveLength(6);
  states.boardStats.positions.forEach((row) => {
    expect(row).toHaveLength(7);
    row.forEach((entry) => {
      expect(Object.keys(entry)).toHaveLength(4);
      expect(entry).toHaveProperty("piece");
      expect([0, 1, null]).toContain(entry.piece);
      expect(entry).toHaveProperty("isWinner");
      expect([true, false]).toContain(entry.isWinner);
      expect(entry).toHaveProperty("wouldWin");
      expect(entry.wouldWin).toHaveLength(2);
      expect(entry).toHaveProperty("isHot");
      expect([true, false]).toContain(entry.isHot);
    });
  });

  expect(states).toHaveProperty("gameStatus");
  expect(["waiting", "ongoing", "won", "draw", "forfeit"]).toContain(
    states.gameStatus
  );

  expect(states).toHaveProperty("toPlayNext");
  expect([0, 1, null]).toContain(states.toPlayNext);

  expect(states).toHaveProperty("winner");
  expect([0, 1, null]).toContain(states.winner);

  // next player can only be null if game is not ongoing
  expect(states.gameStatus !== "ongoing" || states.toPlayNext !== null).toBe(
    true
  );
  // and if the game is not ongoing, it should be null
  expect(states.gameStatus === "ongoing" || states.toPlayNext === null).toBe(
    true
  );

  // likewise, winner can only be null if game is ongoing or draw
  expect(
    states.gameStatus === "won" ||
      states.gameStatus === "forfeit" ||
      states.winner === null
  ).toBe(true);

  // and if the game is not ongoing, it should be null
  expect(
    states.gameStatus === "ongoing" ||
      states.gameStatus === "draw" ||
      states.gameStatus === "waiting" ||
      states.winner !== null
  ).toBe(true);

  // expect(states).toHaveProperty("moveHistory");
  // expect(states.moveHistory).toBeInstanceOf(Array);
  // states.moveHistory.forEach((move) => {
  //   expect(Object.keys(move)).toHaveLength(3);
  //   expect([0, 1]).toContain(move.player);
  //   expect(move.row).toBeGreaterThanOrEqual(0);
  //   expect(move.row).toBeLessThanOrEqual(5);
  //   expect(move.col).toBeGreaterThanOrEqual(0);
  //   expect(move.col).toBeLessThanOrEqual(6);
  // });

  expect(states).toHaveProperty("resetGame");
  expect(states.resetGame).toBeFunction;

  expect(states).toHaveProperty("placePiece");
  expect(states.placePiece).toBeFunction;

  expect(states).toHaveProperty("setForfeiter");
  expect(states.setForfeiter).toBeFunction;
}

function isEmpty(positions) {
  positions.forEach((row, i) => {
    row.forEach((entry, j) => {
      expect(entry.piece).toBeNull();
      expect(entry.isWinner).toBe(false);
    });
  });
}

function isInitialState(states) {
  expect(states.toPlayFirst);
  expect(states.gameStatus).toBe("waiting");
  expect(states.toPlayNext).toBe(null);
  isEmpty(states.boardStats.positions);
  // expect(states.moveHistory).toEqual([]);
}

// tests

it("useGame initial states valid", () => {
  const { result } = renderHook(() => useGame());

  validStates(result.current);
  isInitialState(result.current);
});

it("useGame states remain valid after (redundant) reset", () => {
  const { result } = renderHook(() => useGame());

  act(() => result.current.resetGame());
  validStates(result.current);
  isInitialState(result.current);
});

it("useGame states remain valid after playing first piece", () => {
  for (let initialPlayer = 0; initialPlayer < 2; initialPlayer++) {
    for (let col = 0; col < 7; col++) {
      const { result } = renderHook(() => useGame());

      expect(result.current.gameStatus).toBe("waiting");
      // start game
      act(() => result.current.startGame(initialPlayer));
      // place piece in column col
      act(() => result.current.placePiece(col, result.current.toPlayNext));
      validStates(result.current);
      expect(result.current.gameStatus).toBe("ongoing");
      result.current.boardStats.positions.forEach((row, i) => {
        row.forEach((entry, j) => {
          if (i === 0 && j === col) {
            expect(entry.piece).toBe(1 - result.current.toPlayNext);
          } else {
            expect(entry.piece).toBeNull();
          }
        });
      });
    }
  }
});

it("useGame states remain valid bewteen/after 3 moves then reset", () => {
  for (let initialPlayer = 0; initialPlayer < 2; initialPlayer++) {
    for (let col = 0; col < 7; col++) {
      const { result } = renderHook(() => useGame());

      // start game
      act(() => result.current.startGame(initialPlayer));
      // place piece in column col
      act(() => result.current.placePiece(col, result.current.toPlayNext));
      validStates(result.current);

      // place piece in another column (2 over from col)
      act(() =>
        result.current.placePiece((col + 2) % 7, result.current.toPlayNext)
      );
      validStates(result.current);

      // place piece in latter column
      act(() =>
        result.current.placePiece((col + 2) % 7, result.current.toPlayNext)
      );
      validStates(result.current);

      // check positions matches the 3 pieces placed
      expect(result.current.gameStatus).toBe("ongoing");
      result.current.boardStats.positions.forEach((row, i) => {
        row.forEach((entry, j) => {
          if ((i === 0 && j === col) || (i === 1 && j === (col + 2) % 7)) {
            expect(entry.piece).toBe(initialPlayer);
          } else if (i === 0 && j === (col + 2) % 7) {
            expect(entry.piece).toBe(1 - initialPlayer);
          } else {
            expect(entry.piece).toBeNull();
          }
        });
      });

      // reset positions
      act(() => result.current.resetGame());
      validStates(result.current);
      isInitialState(result.current);
    }
  }
});

it("useGame detects horizontal win", () => {
  for (let initialPlayer = 0; initialPlayer < 2; initialPlayer++) {
    const { result } = renderHook(() => useGame());

    // - - 1 1 1 - -
    // - - 0 0 0 0 -    <- bottom row

    // start game
    act(() => result.current.startGame(initialPlayer));
    for (let i = 4; i < 11; i++) {
      act(() =>
        result.current.placePiece(Math.floor(i / 2), result.current.toPlayNext)
      );
    }

    validStates(result.current);
    expect(result.current.gameStatus).toBe("won");
    expect(result.current.winner).toBe(initialPlayer);

    for (let i = 2; i < 6; i++) {
      expect(result.current.boardStats.positions[0][i].isWinner).toBe(true);
    }
  }
});

it("useGame detects vertical win", () => {
  for (let initialPlayer = 0; initialPlayer < 2; initialPlayer++) {
    for (let col = 0; col < 7; col++) {
      const { result } = renderHook(() => useGame());

      // - - - - 1 - -
      // - - - - 1 0 -
      // - - - - 1 0 -
      // 0 - - - 1 0 -    <- bottom row

      // start game
      act(() => result.current.startGame(initialPlayer));

      // place off-set piece
      act(() => result.current.placePiece((col + 3) % 7, initialPlayer));

      // build verticals
      for (let i = 0; i < 7; i++) {
        act(() =>
          result.current.placePiece(
            (col + (i % 2)) % 7,
            result.current.toPlayNext
          )
        );
      }

      validStates(result.current);
      expect(result.current.gameStatus).toBe("won");
      expect(result.current.winner).toBe(1 - initialPlayer);

      for (let i = 0; i < 4; i++) {
        expect(result.current.boardStats.positions[i][col].isWinner).toBe(true);
      }
    }
  }
});

it("useGame detects draw", () => {
  for (let initialPlayer = 0; initialPlayer < 2; initialPlayer++) {
    const { result } = renderHook(() => useGame());

    // 0 1 0 1 0 1 0
    // 0 1 0 1 0 1 1
    // 0 1 0 1 0 1 0
    // 1 0 1 0 1 0 1
    // 1 0 1 0 1 0 0
    // 1 0 1 0 1 0 1    <- bottom row

    // start game
    act(() => result.current.startGame(initialPlayer));

    for (let k = 0; k < 3; k++) {
      // do columns 2 * k and 2 * k + 1
      for (let j = 0; j < 2; j++) {
        // do the bottom 3 rows (j = 0) then the top 3 (j = 1)
        for (let i = 0; i < 6; i++) {
          // place the pieces
          act(() =>
            result.current.placePiece(
              2 * k + ((i + j) % 2),
              result.current.toPlayNext
            )
          );
        }
      }
    }
    for (let k = 0; k < 6; k++) {
      // do the final column
      act(() => result.current.placePiece(6, result.current.toPlayNext));
    }

    validStates(result.current);
    expect(result.current.gameStatus).toBe("draw");
  }
});
