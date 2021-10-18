import { useState, useEffect, useReducer } from "react";

import { useGame } from "./useGame.js";

// TODO: TEST: create tests for useRoom hook

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

//// Helpers for reducers

const initialResults = { wins: 0, draws: 0, loses: 0 };

// first player of first game is random if unspecified
function useRoom(restartMethod, toPlayFirst = Math.floor(Math.random() * 2)) {
  //// States

  // other player's name and colour, once they join
  // TODO: HOOK: create custom hook to replace constant below
  // TEMP: opponent value in useRoom
  const opponent = { name: "Bob", colour: "red" };
  // how many players are present
  const playerCount = opponent === null ? 1 : 2;
  // history of all games played
  const [resultHistory, dispatchResult] = useReducer(
    resultReducer,
    initialResults
  );
  // the game custom hook
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    placePiece,
    forfeit,
  } = useGame(toPlayFirst);
  // who started the current game (in case first player should alternate)
  const [wentFirst, setWentFirst] = useState(toPlayFirst);

  //// Effects

  // at end of game, update the W-D-L tally and make sounds
  //  possibly these should be distinct effects?
  useEffect(() => {
    switch (gameStatus) {
      case "won":
      case "forfeit":
        winner === 0 && dispatchResult({ type: "win" });
        // TODO: SOUND: for win
        winner === 0 && console.log("win sound"); // TEMP:
        winner === 1 && dispatchResult({ type: "lose" });
        // TODO: SOUND: for lose
        winner === 1 && console.log("lose sound"); // TEMP:
        break;
      case "draw":
        dispatchResult({ type: "draw" });
        console.log("draw sound"); // TEMP:
        // TODO: SOUND: for win
        break;
      default:
    }
  }, [gameStatus, winner]);

  // if a player leaves, reset the W-D-L record
  useEffect(() => {
    if (playerCount === 1) {
      dispatchResult({ type: "reset" });
    }
  }, [playerCount]);

  // play sounds when it becomes your turn to play (opponent moves, or new game)
  // TODO: SOUND: problem: plays both sounds when opp joins and it's your turn
  useEffect(() => {
    if (playerCount === 1) {
      // TODO: SOUND: player leaving
      console.log("Opponent left sound"); // TEMP:
    } else {
      // TODO: SOUND: player joining
      console.log("Opponent joined sound"); // TEMP:
    }
  }, [playerCount]);
  useEffect(() => {
    if (toPlayNext === 0) {
      // TODO: SOUND: your turn
      console.log("Your turn sound"); // TEMP:
    }
  }, [toPlayNext]);

  //// Externally available functions

  // when room owner starts a new game
  //  basically figure out who goes first and then call useGame's reset
  //  also update setWentFirst as may be needed for next such update
  function newGameHandler(gameStatus) {
    let toGoFirst = null;
    // figure out who will go first
    switch (restartMethod) {
      case "random":
        toGoFirst = Math.floor(Math.random() * 2);
        break;
      case "alternate":
        toGoFirst = 1 - wentFirst;

        break;
      case "loser":
        // if it's a draw, keep the same player
        toGoFirst = gameStatus === "draw" ? wentFirst : 1 - winner;
        break;
      case "winner":
        // if it's a draw, keep the same player
        toGoFirst = gameStatus === "draw" ? wentFirst : winner;
        break;
      default:
        console.log("New Game click handler didn't match any case.");
        toGoFirst = 0;
    }
    // call useGame's reset, update own state
    resetGame(toGoFirst);
    setWentFirst(toGoFirst);
  }
  //// Return

  return {
    opponent,
    resultHistory,
    board,
    gameStatus,
    winner,
    toPlayNext,
    moveHandler: placePiece,
    forfeitHandler: forfeit,
    newGameHandler,
    kickOpponentHandler: null, // TEMP:
    closeRoomHandler: null, // TEMP:
    leaveRoomHandler: null, // TEMP:
  };
}

export { useRoom };
