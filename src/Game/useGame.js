import { boardStats as getBoardStats } from "./../Game/boardStats.js";
import { useState, useReducer } from "react";

//// Generic constants helpers

// create empty tables (for initial states, and on resets)
function emptyTable(rows, cols, val = null) {
  let table = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(val);
    }
    table.push(row);
  }
  return table;
}

//// Reducers

function gameStatesReducer(state, action) {
  let newState = { ...state };
  switch (action.type) {
    case "reset":
      return { moveHistory: [], pieces: emptyTable(action.rows, action.cols) };
    case "move":
      let { player, row, col } = action;
      newState.moveHistory.push({ player, row, col });
      newState.pieces[action.row][action.col] = action.player;
      return newState;
    case "undo":
      // NOTE: undo case currently unused
      if (state.moveHistory.length === 0) {
        return state;
      } else {
        newState.moveHistory.pop();
        newState[action.row][action.col] = null;
        return newState;
      }
    default:
      console.error("gameStatesReducer has no matching case: ", action);
      return state;
  }
}

//// The actual hook

// TODO: LATER: TIME_LIMIT: option to add time limit to turns
// TODO: MAYBE: UNDO: return an undo function

function useGame(rows = 6, cols = 7, lineLen = 4) {
  //// States

  // who goes first
  const [toPlayFirst, setToPlayFirst] = useState(null);

  // waiting for first game to start?
  const [waiting, setWaiting] = useState(true);

  // who has forfeit (player index, or null)
  const [forfeiter, setForfeiter] = useState(null);

  // pieces and moveHistory wrapped in object
  const [{ moveHistory, pieces }, dispatchToGame] = useReducer(
    gameStatesReducer,
    {
      moveHistory: [],
      pieces: emptyTable(rows, cols),
    }
  );

  //// Constants

  // generate data about all positions and lines on the board
  const keyAttributes = { pieces, rows, cols, lineLen };
  const boardStats = getBoardStats(keyAttributes);
  const { positions, columns } = boardStats;

  // previous move: { player, row, col } (or null)
  const prevMove =
    moveHistory.length === 0 ? null : moveHistory[moveHistory.length - 1];

  // check if the board is won
  const boardIsWon =
    moveHistory.length > 0 && positions[prevMove.row][prevMove.col].isWinner;

  // check if the board is full
  const boardIsFull = columns.every((col) => col.isFull);

  // based purely on the board (not forfeit); ongoing, won, or draw
  const boardStatus = boardIsWon // check the board for a win
    ? "won" // found win
    : boardIsFull // otherwise, check the board for a draw
    ? "draw" // found draw
    : "ongoing"; // didn't find draw

  // takes into account possible forfeit: ongoing, won, draw, or forfeit
  const gameStatus = waiting // check whether we're waiting to start
    ? "waiting" // if so
    : forfeiter !== null // if not, check for feifeit
    ? "forfeit" // if so
    : boardStatus; // otherwise, default to boardStatus

  // index of winning player (via game play for via forfeit), or null
  const winner =
    gameStatus === "forfeit" // check for forfeit
      ? 1 - forfeiter // if so, other player won
      : gameStatus === "won" // otherwise, check for win
      ? prevMove.player // if so, then most recent player won
      : null; // otherwise, there's no winner

  // index of player to play next move, or null if game is not ongoing
  const toPlayNext =
    gameStatus !== "ongoing"
      ? null
      : moveHistory.length === 0
      ? toPlayFirst
      : 1 - prevMove.player;

  //// Externally accessible functions

  // full reset of states
  function resetGame() {
    setWaiting(true);
    setForfeiter(null);
    setToPlayFirst(null);
    dispatchToGame({ type: "reset", rows, cols });
  }

  // starts a game (from reset/initial state or from old game)
  function startGame(option) {
    // partial reset
    setForfeiter(null);
    dispatchToGame({ type: "reset", rows, cols });

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

  // given out to allow component to (attempt to) place a piece
  function placePiece(col, player) {
    const column = columns[col];
    // only proceed if move is valid
    if (gameStatus === "ongoing" && player === toPlayNext && !column.isFull) {
      const row = column.firstOpenRow;
      dispatchToGame({ type: "move", player, row, col });
    }
  }

  //// Return

  return {
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
    boardStats,
  };
}

export { useGame };
