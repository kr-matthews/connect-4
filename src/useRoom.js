import { useState, useEffect, useReducer } from "react";

import { useGame } from "./useGame.js";

// TODO: NEXT: clean up; encapsulate more and return more specific functions

//// Reducers

function opponentReducer(state, action) {
  let newState = [...state];
  newState[action.property] = action.value;
  return newState;
}

function resultReducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialResults;
    default:
      // win, draw, or lose
      let newState = { ...state };
      newState[action.type + "s"] += 1;
      return newState;
  }
}

const initialResults = { wins: 0, draws: 0, loses: 0 };

// first player of first game is random
function useRoom(restartMethod, firstPlayer = Math.floor(Math.random() * 2)) {
  //// States

  // TODO: keep playerCount and opponent updated -- involves network

  // how many players are present
  // TEMP: initial state -- should be 2 if joining someone else's room
  const [playerCount, setPlayerCount] = useState(2);
  // other player's name and colour, once they join
  // TEMP: initial state -- should check network and be null if necessary
  const [opponent, dispatchOpponent] = useReducer(opponentReducer, {
    name: "Bob",
    colour: "red",
  });
  // colours
  const colours = ["Blue", opponent.colour]; // TEMP: get blue from context
  // who started the current game (in case first player should alternate)
  const [wentFirst, setWentFirst] = useState(firstPlayer);
  // history of all games played
  const [resultHistory, dispatchResult] = useReducer(
    resultReducer,
    initialResults
  );
  // the game custom hook
  const game = useGame(firstPlayer);
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    placePiece,
    forfeit,
  } = game;

  //// Effects

  // (only) when gameStatus changes, update the W-D-L tally
  useEffect(() => {
    switch (gameStatus) {
      case 0:
        // TODO: add sounds for each end-game case
        dispatchResult({ type: "win" });
        break;
      case 1:
        dispatchResult({ type: "lose" });
        break;
      case "draw":
        dispatchResult({ type: "draw" });
        break;
      default:
    }
  }, [gameStatus]);

  // play sounds when it becomes your turn to play (opponent moves, or new game)
  useEffect(() => {
    if (toPlayNext === 0) {
      // TODO: your turn sound
    }
  }, [toPlayNext]);
  useEffect(() => {
    if (playerCount === 1) {
      // TODO: player leaving sound
    } else {
      // TODO: player joining sound
    }
  }, [playerCount]);

  //// Helpers

  function moveHandler() {
    // TODO: moveHandler
  }

  function newGameHandler(gameStatus) {
    // TODO: redo this, after useRoom hook is refactored
    switch (restartMethod) {
      case "random":
        const player = Math.floor(Math.random() * 2);
        resetGame(player);
        setWentFirst(player);
        break;
      case "alternate":
        resetGame(1 - wentFirst);
        setWentFirst(1 - wentFirst);
        break;
      case "loser":
        if (gameStatus === "draw") {
          // if it's a draw, keep the same player
          resetGame(wentFirst);
        } else {
          resetGame(1 - gameStatus);
          setWentFirst(1 - gameStatus);
        }
        break;
      case "winner":
        if (gameStatus === "draw") {
          // if it's a draw, keep the same player
          resetGame(wentFirst);
        } else {
          resetGame(gameStatus);
        }
        break;
      default:
        console.log("New Game click handler didn't match any case.");
        resetGame(0);
    }
  }

  function forfeitHandler(player) {
    // TODO: redo this, after useRoom hook is refactored
    forfeit(player);
  }

  function kickOpponentHandler() {
    // TODO: kickOpponentHandler
  }

  //// Return

  return {
    opponent,
    resultHistory,
    kickOpponentHandler,
    board,
    gameStatus,
    winner,
    toPlayNext,
    moveHandler,
    forfeitHandler,
    newGameHandler,
  };
}

export { useRoom };
