import { useState, useReducer } from "react";

function useGame() {
  const boardSize = [6, 7];

  const [gameStatus, setGameStatus] = useState("reset");
  const [toPlayNext, setToPlayNext] = useState(null);
  const [board, dispatchMove] = useReducer(boardReducer, emptyBoard(boardSize));
  const [moveHistory, dispatchHistory] = useReducer(historyReducer, []);

  // reset all constants above
  function resetGame() {
    setGameStatus("reset");
    setToPlayNext(null);
    dispatchMove({ type: "reset" });
    dispatchHistory({ type: "reset" });
  }

  // internal function to update board
  function boardReducer(state, action) {
    switch (action.type) {
      case "reset":
        return emptyBoard(boardSize);
      case "placePiece":
        // TODO:starthere confirm this is done
        var row = findEmptyRow(state, action.col);
        if (row === null) {
          return state;
        } else {
          let newState = [...state];
          newState[row][action.col] = action.player;
          return newState;
        }
      default:
        console.log("boardReducer switch didn't match any case");
        return state;
    }
  }

  // helper: find row that piece will end up in
  // TODO: does this need to live elsewhere?
  function findEmptyRow() {
    // TODO:
  }

  // create initial empty board, on resets
  function emptyBoard([rows, cols]) {
    var board = [];
    for (var r = 0; r < rows; r++) {
      board.push(Array(cols).fill(null));
    }
    return board;
  }

  // internal function to update move history
  function historyReducer(state, action) {
    // TODO:
    switch (action.type) {
      case "reset":
        return [];
      case "addHistory":
        // TODO: this case, and maybe more cases?
        return state;
      default:
        console.log("historyReducer switch didn't match any case");
        return state;
    }
  }

  // given out to allow component to (attempt to) place a piece
  function placePiece() {
    // TODO:
  }

  return [board, gameStatus, toPlayNext, resetGame, moveHistory, placePiece];
}

export { useGame };
