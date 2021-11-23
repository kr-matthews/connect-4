import {
  directions,
  findEmptyRow,
  isFull,
  isSpotInLine,
  checkLine,
} from "./PiecesHelpers.js";
import { useState, useReducer } from "react";

//// Generic constants helpers

// TODO: NEXT: in process of transfering helper functions out

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
      console.error("moveHistoryReducer didn't match any case.", action);
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
      console.error("peicesReducer didn't match any case.", action);
      return state;
  }
}

//// The actual hook

// TODO: LATER: TIME_LIMIT: option to add time limit to turns

function useGame(rows = 6, cols = 7, lineLen = 4) {
  //// States & Constants

  // who goes first
  const [toPlayFirst, setToPlayFirst] = useState(null);

  // waiting for first game to start?
  const [waiting, setWaiting] = useState(true);

  // who has forfeit (player index, or null)
  const [forfeiter, setForfeiter] = useState(null);
  // stack (array) of {player, row, col}

  const [moveHistory, dispatchMoveHistory] = useReducer(moveHistoryReducer, []);
  // table of player indices/null; indicates which piece is there (if any)
  const [pieces, dispatchPieces] = useReducer(
    piecesReducer,
    emptyTable(rows, cols, null)
  );
  // previous move
  const prevMove =
    moveHistory.length === 0 ? null : moveHistory[moveHistory.length - 1];

  // bundle of things which other hooks (computer play) may need
  const keyAttributes = { pieces, rows, cols, lineLen };
  // based purely on the board (not forfeit); ongoing, won, or draw
  const boardStatus = isWon() // check the board for a win
    ? "won" // found win
    : isFull(keyAttributes) // otherwise, check the board for a draw
    ? "draw" // found draw
    : "ongoing"; // didn't find draw
  // takes into account possible forfeit: ongoing, won, draw, or forfeit
  const gameStatus = waiting // waiting to start
    ? "waiting"
    : forfeiter !== null // check for feifeit
    ? "forfeit" // if so
    : boardStatus; // otherwise, default to boardStatus
  // index of winning player (via game play for via forfeit), or null
  const winner =
    gameStatus === "forfeit" // check for forfeit
      ? 1 - forfeiter // if so, other player won
      : gameStatus === "won" // otherwise, check for win
      ? prevMove.player // if so, then most recent player won
      : null; // otherwise, there's no winner

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
      : 1 - prevMove.player;

  //// Helpers
  // isWon and createHighlights share a lot of code :(

  // check if the game is won
  function isWon() {
    if (moveHistory.length < 2 * lineLen - 1) {
      // impossible for anyone to have won yet
      return false;
    }

    const { row, col } = prevMove;
    if (pieces[row][col] === null) {
      // pieces are out of sync with board, don't bother checking
      return false;
    }
    // only need to examine most recent move (which exists)
    return isSpotInLine(row, col, keyAttributes);
  }

  // TODO: MAYBE: HIGHLIGHT: highlight most recent piece? would be easy

  // highlight winning locations
  function createHighlights() {
    let table = emptyTable(rows, cols, false);
    if (moveHistory.length < 2 * lineLen - 1) {
      // impossible for anyone to have won yet; no highlights needed
      return table;
    }
    // only check the most recently played location (which exists)
    let { player, row, col } = prevMove;
    for (let d = 0; d < directions.length; d++) {
      const [d_r, d_c] = directions[d];
      // for the 4 pieces in this direction (including row,col),
      //  check if it is in a line pointing towards row,col
      for (let j = -lineLen + 1; j < 1; j++) {
        if (
          checkLine(
            player,
            row + j * d_r,
            col + j * d_c,
            d_r,
            d_c,
            keyAttributes
          )
        ) {
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

  //// Externally accessible functions

  // full reset of states
  function resetGame() {
    setWaiting(true);
    setForfeiter(null);
    setToPlayFirst(null);
    dispatchMoveHistory({ type: "reset" });
    dispatchPieces({ type: "reset", rows, cols });
  }

  // starts a game (from reset/initial state or from old game)
  function startGame(option) {
    // partial reset
    setForfeiter(null);
    dispatchMoveHistory({ type: "reset" });
    dispatchPieces({ type: "reset", rows, cols });

    // start
    setToPlayFirst((prev) => {
      const randomPlayer = Math.floor(Math.random() * 2);
      if (prev === null) {
        // if there was no previous game
        return option === 0 ? 0 : option === 1 ? 1 : randomPlayer;
      }
      // otherwise, there was a previous game
      switch (option) {
        case "alternate":
          return 1 - prev;
        case "winner":
          return winner !== null ? winner : prev;
        case "loser":
          return winner !== null ? 1 - winner : prev;
        case "random":
          return randomPlayer;
        case 0:
          return 0;
        case 1:
          return 1;
        default:
          console.error("Couldn't select first player.", option);
          return 0;
      }
    });
    setWaiting(false);
  }

  // NOTE: PROBLEM: re-render between two dispatches below means state may be
  //  out of sync

  // QUESTION: under what cicumstances does react re-render between those
  //  dispatches?
  //  Does it ever re-render mid-useEffect?

  // given out to allow component to (attempt to) place a piece
  function placePiece(col, player) {
    let row = findEmptyRow(col, keyAttributes);
    // only proceed if move is valid
    if (gameStatus === "ongoing" && player === toPlayNext && row !== null) {
      dispatchMoveHistory({ type: "addMove", player, row, col });
      dispatchPieces({ type: "placePiece", player, row, col });
    }
  }

  //// Return

  // TODO: MAYBE: UNDO: return an undo function
  return {
    board,
    gameStatus,
    prevMove,
    toPlayFirst,
    toPlayNext,
    winner,
    resetGame,
    startGame,
    placePiece,
    setForfeiter,
    keyAttributes,
  };
}

export { useGame };
