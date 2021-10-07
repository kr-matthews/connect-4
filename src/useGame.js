import { useState, useReducer, useEffect, useMemo } from "react";

//// reducers
// outside the hook function to ensure they are pure

function boardReducer(state, action) {
  switch (action.type) {
    case "reset":
      return emptyBoard(action.boardSize);
    case "placePiece":
      let newState = state;
      // add the piece
      newState[action.row][action.col].player = action.player;
      // if there is a new, highlight the winning pieces
      let { success, r_0, c_0, d_r, d_c } = findWin(
        newState,
        action.row,
        action.col
      );
      if (success) {
        // NOTE: another use of 4 from "connect 4"
        for (let k = 0; k < 4; k++) {
          newState[r_0 + k * d_r][c_0 + k * d_c].inLine = true;
        }
      }
      return newState;
    case "undo":
      // NOTE: this case is currently not used
      // TODO: build in UNDO to interface and add workflow -- note it needs moveHistory passed in
      if (action.moveHistory === []) {
        return state;
      } else {
        let newState = state;
        delete newState[action.row][action.col].player;
        // TODO: unhighlight winning positions if necessary
        return newState;
      }
    default:
      return state;
  }
}

function historyReducer(state, action) {
  switch (action.type) {
    case "reset":
      return [];
    case "addMove":
      let newState = state;
      let { player, row, col } = action;
      newState.push({ player, row, col });
      return newState;
    case "undo":
      if (state === []) {
        return state;
      } else {
        let newState = state;
        newState.pop();
        return newState;
      }
    default:
      console.log("historyReducer switch didn't match any case");
      return state;
  }
}

//// helpers for reducers

// create initial empty board (on resets)
function emptyBoard([rows, cols]) {
  let board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push({ player: null, inLine: false });
    }
    board.push(row);
  }
  return board;
}

// find row that piece will end up in
function findEmptyRow(boardState, col) {
  let rows = boardState.length;
  for (let row = 0; row < rows; row++) {
    if (boardState[row][col].player === null) {
      return row;
    }
  }
  return null;
}

//// helpers for effects
// outside to ensure pure (to avoid being needed in the dependency array)

const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

function full(board, boardSize) {
  let hasNull = false;
  // check the top row for nulls
  board[boardSize[0] - 1].forEach((entry) => {
    if (entry.player === null) {
      hasNull = true;
    }
  });
  return !hasNull;
}

// NOTE: this is the main place that 4 from "connect 4" is used
function findWin(board, row, col) {
  const [rows, cols] = [board.length, board[0].length];
  const player = board[row][col].player;
  if (player === null) {
    return { success: false };
  }
  let success = false;
  let [r_0, c_0, d_r, d_c] = [null, null, null, null];
  directions.forEach(([d_row, d_col]) => {
    if (!success) {
      // no need to proceed if we already found a win
      // reset return values
      [r_0, c_0, d_r, d_c] = [null, null, d_row, d_col];
      let current = 0;
      for (let k = -3; k < 4; k++) {
        if (
          -1 < row + k * d_row &&
          row + k * d_row < rows &&
          -1 < col + k * d_col &&
          col + k * d_col < cols &&
          board[row + k * d_row][col + k * d_col].player === player
        ) {
          // if the player has a piece here
          if (current === 0) {
            // if the piror piece was not compatible (wrong player or out of bounds)
            // then this is the new start
            r_0 = row + k * d_row;
            c_0 = col + k * d_col;
          }
          current += 1;
          if (current >= 4) {
            // found a winner
            success = true;
          }
        } else {
          // no piece here -- reset
          current = 0;
        }
      }
    }
  });

  return { success, r_0, c_0, d_r, d_c };
}

function useGame(toPlayFirst) {
  //// Constants

  // to change board dimensions, change this
  // NOTE: maybe add as prop for hook?
  const boardSize = useMemo(() => [6, 7], []);
  // the possible line directions (horizontal, vertical, diagonal, anti-diagonal)

  //// States

  // ongoing, draw, or the index of a player
  const [gameStatus, setGameStatus] = useState("ongoing");
  // index of player to play next move
  const [toPlayNext, setToPlayNext] = useState(toPlayFirst);
  // matrix, row 0 at the bottom; each cell is an object
  const [board, dispatchMove] = useReducer(boardReducer, emptyBoard(boardSize));
  // stack (array) of {player, row, col}
  const [moveHistory, dispatchHistory] = useReducer(historyReducer, []);

  //// Effects

  // check for win/draw
  useEffect(() => {
    if (moveHistory.length > 0) {
      let { row, col, player } = moveHistory[moveHistory.length - 1];
      let { success, r_0, c_0 } = findWin(board, row, col);
      if (gameStatus === "ongoing" && success) {
        // the game state should be the index of the winner
        setGameStatus(board[row][col].player);
      } else if (full(board, boardSize)) {
        // it's a draw
        setGameStatus("draw");
      }
    }
  }, [board, boardSize, gameStatus, moveHistory]);

  //// Externally accessible functions

  // given out to reset all states
  function resetGame(player) {
    setGameStatus("ongoing");
    setToPlayNext(player);
    dispatchMove({ type: "reset", boardSize });
    dispatchHistory({ type: "reset" });
  }

  // given out to allow component to (attempt to) place a piece
  function placePiece(player, col) {
    let row = findEmptyRow(board, col);
    if (player === toPlayNext && row !== null) {
      // move is possible; proceed
      dispatchMove({ type: "placePiece", player, row, col });
      dispatchHistory({ type: "addMove", player, row, col });
      setToPlayNext(1 - player);
      // gameStatus is then updated via a useEffect
    }
  }

  // Return

  return { gameStatus, toPlayNext, board, moveHistory, resetGame, placePiece };

  // TODO: return an undo function, rather than the moveHistory?
}

export { useGame };
