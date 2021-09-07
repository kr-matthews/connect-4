import { useState, useReducer } from "react";

function useGame() {
  // to change board dimensions, change this
  const boardSize = [6, 7];
  // the possible line directions (horizontal, vertical, diagonal)
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  // States

  // ongoing, draw, or the index of a player
  const [gameStatus, setGameStatus] = useState("ongoing");
  // indices of winning pieces
  const [winningIndices, dispatchIndices] = useReducer(indicesReducer, []);
  // index of player
  const [toPlayNext, setToPlayNext] = useState(null);
  // array of arrays, row 0 at the bottom
  const [board, dispatchMove] = useReducer(boardReducer, emptyBoard(boardSize));
  // stack (array) of {player, row, col}
  const [moveHistory, dispatchHistory] = useReducer(historyReducer, []);

  // Internal functions

  // reducers

  // internal function to update board
  function boardReducer(state, action) {
    switch (action.type) {
      case "reset":
        return emptyBoard(boardSize);
      case "placePiece":
        var row = findEmptyRow(state, action.col);
        if (row === null) {
          return state;
        } else {
          let newState = [...state];
          newState[row][action.col] = action.player;
          return newState;
        }
      case "undo":
        // this case is currently not used
        if (moveHistory === []) {
          return state;
        } else {
          let newState = [...state];
          newState[action.row][action.col] = null;
          return newState;
        }
      default:
        console.log("boardReducer switch didn't match any case");
        return state;
    }
  }

  // internal function to update move history
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

  function indicesReducer(state, action) {
    switch (action.type) {
      case "reset":
        return [];
      case "addIndices":
        let { row, col, d_r, d_c } = action;
        let newState = [];
        for (let k = -3; k < 1; k--) {
          newState.push([row + k * d_r, col + k * d_c]);
        }
        return newState;
      default:
        console.log("indicesReducer switch didn't match any case");
        return state;
    }
  }

  // helper: find row that piece will end up in
  // QUESTION: does this need to be used (hence defined) elsewhere?
  function findEmptyRow(state, col) {
    let height = state.length();
    for (let row = 0; row < height; row++) {
      if (state[row][col] === null) {
        return row;
      }
    }
    return null;
  }

  // create initial empty board, on resets
  function emptyBoard([rows, cols]) {
    var board = [];
    for (var r = 0; r < rows; r++) {
      board.push(Array(cols).fill(null));
    }
    return board;
  }

  // piece was just added to row, col by player
  // check whether that was a winning move
  //  and whether the board is full (a draw)
  function checkWinOrDraw(player, row, col) {
    let [rows, cols] = boardSize;
    let message = null;
    directions.forEach(([d_r, d_c]) => {
      let current = 0;
      for (let k = -3; k < 4; k++) {
        if (
          -1 < row + k * d_r < rows &&
          -1 < col + k * d_c < cols &&
          board[row + k * d_r][col + k * d_c] === player
        ) {
          current += 1;
          // the only use of the 4 from "connect 4"
          if (current >= 4) {
            message = [row + k * d_r, col + k * d_c, d_r, d_c];
          }
        } else {
          current = 0;
        }
      }
    });

    if (message !== null) {
      let [row, col, d_r, d_c] = message;
      setGameStatus(player);
      dispatchIndices({ type: "addIndices", row, col, d_r, d_c });
      return;
    } else if (!board[-1].includes(null)) {
      setGameStatus("draw");
      return;
    }
  }

  // Externally accessible functions

  // given out to reset reset all states in useGame
  function resetGame(player) {
    setGameStatus("ongoing");
    dispatchIndices("reset");
    setToPlayNext(player);
    dispatchMove({ type: "reset" });
    dispatchHistory({ type: "reset" });
    return { success: true };
  }

  // given out to allow component to (attempt to) place a piece
  function placePiece(player, col) {
    if (player !== toPlayNext) {
      return { success: false, details: "wrong player" };
    }
    let row = findEmptyRow(board, col);
    if (row === null) {
      return { success: false, details: "full column" };
    }
    // move is possible; proceed
    dispatchMove({ type: "placePiece", player, col });
    dispatchHistory({ type: "addMove", player, row, col });
    checkWinOrDraw(player, row, col);
    setToPlayNext(1 - player);
    return { success: true };
  }

  return [
    gameStatus,
    winningIndices,
    toPlayNext,
    board,
    moveHistory,
    resetGame,
    placePiece,
  ];
}

export { useGame };
