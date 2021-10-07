import { useState, useReducer, useEffect, useMemo } from "react";

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

function findWin() {
  // TODO: NEXT: define findWin() function (use commented code below)
  return { start: [0, 1], direction: [1, 1] };
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
    let { success, row, col } = findWin();
    if (success) {
      // the game state is the index of the winner
      setGameStatus(board[row][col].player);
    } else if (full(board, boardSize)) {
      // it's a draw
      setGameStatus("draw");
    }
  }, [board, boardSize]);

  // highlight winning pieces
  useEffect(() => {
    if (gameStatus === 0 || gameStatus === 1) {
      let { success, row, col, d_r, d_c } = findWin();
      // TODO: NEXT: given data above, update the board to highlight pieces
    }
  }, [gameStatus]);

  //
  // piece was just added to row, col by player
  // check whether that was a winning move
  //  and whether the board is full (a draw)
  // function checkWinOrDraw(player, row, col) {
  //   let [rows, cols] = [board.length, board[0].length];
  //   let message = null;
  //   directions.forEach(([d_r, d_c]) => {
  //     let current = 0;
  //     for (let k = -3; k < 4; k++) {
  //       if (
  //         // check coordinates are in bounds, then check for piece
  //         -1 < row + k * d_r &&
  //         row + k * d_r < rows &&
  //         -1 < col + k * d_c &&
  //         col + k * d_c < cols &&
  //         board[row + k * d_r][col + k * d_c].player === player
  //       ) {
  //         current += 1;
  //         if (current >= 4) {
  //           // the only use of the 4 from "connect 4"
  //           message = [row + k * d_r, col + k * d_c, d_r, d_c];
  //         }
  //       } else {
  //         current = 0;
  //       }
  //     }
  //   });
  // }

  // Externally accessible functions

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
