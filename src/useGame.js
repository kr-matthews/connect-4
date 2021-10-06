import { useState, useReducer } from "react";

//// reducers
// outside the hook function to ensure they are pure

function boardReducer(state, action) {
  switch (action.type) {
    case "reset":
      return emptyBoard(action.boardSize);
    case "placePiece":
      let newState = [...state];
      newState[action.row][action.col] = {
        ...newState[action.row][action.col],
        player: action.player,
      };
      // TODO: highlight winning positions if necessary
      return newState;
    case "undo":
      // this case is currently not used
      // TODO: build in UNDO to interface and add workflow -- note it needs moveHistory passed in
      if (action.moveHistory === []) {
        return state;
      } else {
        let newState = [...state];
        delete newState[action.row][action.col].player;
        // TODO: unhighlight winning positions if necessary
        return newState;
      }
    default:
      console.log("boardReducer switch didn't match any case");
      return state;
  }
}

function historyReducer(state, action) {
  switch (action.type) {
    case "reset":
      return [];
    case "addMove":
      let newState = [...state];
      let { player, row, col } = action;
      newState.push({ player, row, col });
      return newState;
    case "undo":
      if (state === []) {
        return state;
      } else {
        let newState = [...state];
        newState.pop();
        return newState;
      }
    default:
      console.log("historyReducer switch didn't match any case");
      return state;
  }
}

// helpers for reducers

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

// helper: find row that piece will end up in
function findEmptyRow(state, col) {
  let rows = state.length;
  for (let row = 0; row < rows; row++) {
    if (state[row][col].player === null) {
      return row;
    }
  }
  return null;
}

function useGame(toPlayFirst) {
  //// Constants

  // to change board dimensions, change this (maybe add as param for hook?)
  const boardSize = [6, 7];
  // the possible line directions (horizontal, vertical, diagonal, anti-diagonal)
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
  ];

  //// States

  // ongoing, draw, or the index of a player
  const [gameStatus, setGameStatus] = useState("ongoing");
  // indices of winning pieces
  const [toPlayNext, setToPlayNext] = useState(toPlayFirst);
  // array of arrays, row 0 at the bottom;
  //  cells are objects storing multiple pieces of information
  const [board, dispatchMove] = useReducer(boardReducer, emptyBoard(boardSize));
  // stack (array) of {player, row, col}
  const [moveHistory, dispatchHistory] = useReducer(historyReducer, []);

  // NOTE: this is unused; encorporate it into boardReducer (to highlight wins)
  // function indicesReducer(state, action) {
  //   switch (action.type) {
  //     case "reset":
  //       return [];
  //     case "addIndices":
  //       let { row, col, d_r, d_c } = action;
  //       let newState = [];
  //       for (let k = -3; k < 1; k--) {
  //         newState.push([row + k * d_r, col + k * d_c]);
  //       }
  //       return newState;
  //     default:
  //       console.log("indicesReducer switch didn't match any case");
  //       return state;
  //   }
  // }

  // internal functions

  // piece was just added to row, col by player
  // check whether that was a winning move
  //  and whether the board is full (a draw)
  function checkWinOrDraw(player, row, col) {
    console.log(
      "Checking " +
        player +
        " at " +
        row +
        "," +
        col +
        ": " +
        board[row][col].player
    ); // TEMP:
    // NOTE: modifications likely needed
    let [rows, cols] = [board.length, board[0].length];
    let message = null;
    directions.forEach(([d_r, d_c]) => {
      let current = 0;
      for (let k = -3; k < 4; k++) {
        if (
          // check coordinates are in bounds, then check for piece
          -1 < row + k * d_r &&
          row + k * d_r < rows &&
          -1 < col + k * d_c &&
          col + k * d_c < cols &&
          board[row + k * d_r][col + k * d_c].player === player
        ) {
          current += 1;
          if (current >= 4) {
            // the only use of the 4 from "connect 4"
            message = [row + k * d_r, col + k * d_c, d_r, d_c];
          }
        } else {
          current = 0;
        }
      }
    });

    if (message !== null) {
      // let [row, col, d_r, d_c] = message;
      setGameStatus(player);
      // TODO: deal with highlighting winning pieces (above commented row too)
      // dispatchIndices({ type: "addIndices", row, col, d_r, d_c });
      return;
    } else if (
      !board[boardSize[0] - 1]
        .slice()
        .map((cell) => cell.player)
        .includes(null)
    ) {
      setGameStatus("draw");
      return;
    }
  }

  // Externally accessible functions

  // given out to reset all states
  function resetGame(player) {
    // TODO: NEXT: reset doesn't work properly -- check states before/after
    console.log("Reseting!"); // TEMP:
    setGameStatus("ongoing");
    setToPlayNext(player);
    dispatchMove({ type: "reset", boardSize });
    dispatchHistory({ type: "reset" });
    console.log("Reset."); // TEMP:
  }

  // given out to allow component to (attempt to) place a piece
  function placePiece(player, col) {
    let row = findEmptyRow(board, col);
    if (player === toPlayNext && row !== null) {
      // move is possible; proceed
      dispatchMove({ type: "placePiece", player, row, col });
      dispatchHistory({ type: "addMove", player, row, col });
      // TODO: NEXT: game state is not updating on win/lose or on draw
      // TODO: NEXT:  since piece is not being placed before the check
      // TODO: NEXT: research problem and solution(s)
      checkWinOrDraw(player, row, col);
      setToPlayNext(1 - player);
    }
  }

  // Return

  return { gameStatus, toPlayNext, board, moveHistory, resetGame, placePiece };
}

export { useGame };
