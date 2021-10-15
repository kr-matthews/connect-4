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
function useRoom(firstPlayer = Math.floor(Math.random() * 2)) {
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

  //// Return

  return {
    game,
    playerCount,
    opponent,
    resultHistory,
    wentFirst,
    setWentFirst,
    dispatchResult,
  };
}

export { useRoom };
