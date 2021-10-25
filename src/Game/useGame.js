import { useState, useReducer } from "react";

//// Generic constants helpers

// the possible line directions from/to a fixed point
const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

// create empty tables (for initial states, and on resets)
function emptyTable(rows, cols, val) {
  let board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(val === "empty" ? {} : val);
    }
    board.push(row);
  }
  return board;
}

// merge data into one table for passing to component
function combineTables(tables, names) {
  const tableCount = tables.length;
  const [rows, cols] = [tables[0].length, tables[0][0].length];
  let combinedTable = emptyTable(rows, cols, "empty");
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      combinedTable[row][col] = {};
      for (let i = 0; i < tableCount; i++) {
        combinedTable[row][col][names[i]] = tables[i][row][col];
      }
    }
  }
  return combinedTable;
}

//// Reducers
// outside the hook function to ensure they are pure

function moveHistoryReducer(state, action) {
  let newState = [...state];
  switch (action.type) {
    case "reset":
      return [];
    case "addMove":
      let { player, row, col } = action;
      newState.push({ player, row, col });
      return newState;
    case "undo":
      // NOTE: this case is currently not used
      if (state === []) {
        // nothing to undo
        return state;
      } else {
        newState.pop();
        return newState;
      }
    default:
      console.log("moveHistoryReducer switch didn't match any case");
      return state;
  }
}

function piecesReducer(state, action) {
  let newState = [...state];
  switch (action.type) {
    case "reset":
      return emptyTable(action.rows, action.cols, null);
    case "placePiece":
      // add the piece
      newState[action.row][action.col] = action.player;
      return newState;
    case "undo":
      // NOTE: this case is currently not used
      newState[action.row][action.col] = null;
      return newState;
    default:
      console.log("peicesReducer switch didn't match any case");
      return state;
  }
}

//// The actual hook

function useGame(initialToPlayFirst, rows = 6, cols = 7, lineLen = 4) {
  //// States & Constants

  // index of player to play first; only updates on reset
  const [toPlayFirst, setToPlayFirst] = useState(initialToPlayFirst);
  // who has forfeit (player index, or null)
  const [forfeiter, setForfeiter] = useState(null);
  // stack (array) of {player, row, col}
  const [moveHistory, dispatchMoveHistory] = useReducer(moveHistoryReducer, []);
  // table of player indices/null; indicates which piece is there (if any)
  const [pieces, dispatchPieces] = useReducer(
    piecesReducer,
    emptyTable(rows, cols, null)
  );
  // based purely on the board (not forfeit); ongoing, won, or draw
  const boardStatus = isWon() // check the board for a win
    ? "won" // found win
    : isFull() // otherwise, check the board for a draw
    ? "draw" // found draw
    : "ongoing"; // didn't find draw
  // takes into account possible forfeit: ongoing, won, draw, or forfeit
  const gameStatus =
    forfeiter !== null // check for feifeit
      ? "forfeit" // if so
      : boardStatus; // otherwise, default to boardStatus
  // index of winning player (via game play for via forfeit), or null
  const winner =
    gameStatus === "forfeit" // check for forfeit
      ? 1 - forfeiter // if so, other player won
      : gameStatus !== "won" // otherwise, check for win
      ? null // if no win, there's no winner
      : moveHistory[moveHistory.length - 1].player; // if win, then most recent player won
  // table of booleans; indicates whether spot is highlighted in a win
  // (not using state and useEffect since it might make undo awkward?)
  const highlights = createHighlights();
  // matrix, row 0 at the bottom; each cell is an object
  const openColumns = checkOpenCols();
  const board = combineTables(
    [pieces, highlights, openColumns],
    ["player", "isHighlight", "colIsOpen"]
  );
  // index of player to play next move, or null if game is not ongoing
  const toPlayNext =
    gameStatus !== "ongoing"
      ? null
      : moveHistory.length === 0
      ? toPlayFirst
      : 1 - moveHistory[moveHistory.length - 1].player;

  //// Helpers
  // isWon and createHighlights share a lot of code :(

  // find row that piece will end up in when dropped in this col
  function findEmptyRow(col) {
    for (let row = 0; row < rows; row++) {
      if (pieces[row][col] === null) {
        return row;
      }
    }
    return null;
  }

  // check whether the board is full
  function isFull() {
    // check the top row for nulls
    for (let col = 0; col < cols; col++) {
      if (pieces[rows - 1][col] === null) {
        return false;
      }
    }
    return true;
  }

  // check if the game is won
  function isWon() {
    if (moveHistory.length < 2 * lineLen - 1) {
      // impossible for anyone to have won yet
      return false;
    }
    // only need to examine most recent move (which exists)
    const { player, row, col } = moveHistory[moveHistory.length - 1];
    for (let d = 0; d < directions.length; d++) {
      const [d_r, d_c] = directions[d];
      // check for a win using given piece in direction directions[d]
      for (let j = -3; j < 1; j++) {
        // check for a win in the direction starting from offset of j
        if (checkLine(player, row + j * d_r, col + j * d_c, d_r, d_c)) {
          return true;
        }
      }
    }
    return false;
  }

  // highlight winning locations
  function createHighlights() {
    let table = emptyTable(rows, cols, false);
    if (moveHistory.length < 2 * lineLen - 1) {
      // impossible for anyone to have won yet; no highlights needed
      return table;
    }
    // only check the most recently played location (which exists)
    let { player, row, col } = moveHistory[moveHistory.length - 1];
    for (let d = 0; d < directions.length; d++) {
      const [d_r, d_c] = directions[d];
      // for the 4 pieces in this direction (including row,col),
      //  check if it is in a line pointing towards row,col
      for (let j = -lineLen + 1; j < 1; j++) {
        if (checkLine(player, row + j * d_r, col + j * d_c, d_r, d_c)) {
          // this piece, and the 3 after it, form a line of 4, so update them all
          for (let k = j; k < j + lineLen; k++) {
            table[row + k * d_r][col + k * d_c] = true;
          }
        }
      }
    }
    return table;
  }

  // indicates whether the cell is in an open column
  function checkOpenCols() {
    let table = emptyTable(rows, cols);
    for (let col = 0; col < cols; col++) {
      const isOpen = pieces[rows - 1][col] === null;
      for (let row = 0; row < rows; row++) {
        table[row][col] = isOpen;
      }
    }
    return table;
  }

  // given a spot and a direction, check if it's a line of 4
  function checkLine(player, row, col, d_r, d_c) {
    for (let k = 0; k < lineLen; k++) {
      let [r, c] = [row + k * d_r, col + k * d_c];
      // if (r, c) is out of bounds, or doesn't have the right piece
      if (0 > r || r >= rows || 0 > c || c >= cols || pieces[r][c] !== player) {
        return false;
      }
    }
    // all 4 were in-bounds and belonged to player, so return true (they won)
    return true;
  }

  //// Externally accessible functions

  // given out to reset all states
  function resetGame(player) {
    setToPlayFirst(player);
    setForfeiter(null);
    dispatchMoveHistory({ type: "reset" });
    // (use dispatch instead of useEffect since might make undo awkward?)
    dispatchPieces({ type: "reset", rows, cols });
  }

  // given out to allow component to (attempt to) place a piece
  function placePiece(col, player = toPlayNext) {
    let row = findEmptyRow(col);
    // only proceed if move is valid
    if (gameStatus === "ongoing" && player === toPlayNext && row !== null) {
      dispatchMoveHistory({ type: "addMove", player, row, col });
      // (use dispatch instead of useEffect since might make undo awkward?)
      dispatchPieces({ type: "placePiece", player, row, col });
    }
  }

  function forfeit(player) {
    setForfeiter(player);
  }

  //// Return

  // TODO: MAYBE LATER: return an undo function
  return {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    placePiece,
    forfeit,
  };
}

export { useGame };