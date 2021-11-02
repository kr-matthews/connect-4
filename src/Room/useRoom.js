import { useState, useEffect, useReducer, useContext } from "react";

import { useGame } from "./../Game/useGame.js";

import { SoundContext } from "./../App.js";

import playerJoinSound from "./../sounds/chime-sound-7143.mp3";
import playerLeaveSound from "./../sounds/notification-sound-7062.mp3";
import kickOpponentSound from "./../sounds/fist-punch-or-kick-7171.mp3";

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
function useRoom(
  player,
  restartMethod,
  publishMessage,
  toPlayFirst = Math.floor(Math.random() * 2)
) {
  //// States

  // other player's name and colour, once they join\
  const [opponent, setOpponent] = useState(null);
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

  // W-D-L tally

  // at end of game, update the W-D-L tally
  useEffect(() => {
    if (winner === 0) {
      dispatchResult({ type: "win" });
    } else if (winner === 1) {
      dispatchResult({ type: "lose" });
    }
  }, [winner]);
  useEffect(() => {
    if (gameStatus === "draw") {
      dispatchResult({ type: "draw" });
    }
  }, [gameStatus]);

  // if opponent leaves, reset the W-D-L record
  useEffect(() => {
    if (playerCount === 1) {
      dispatchResult({ type: "reset" });
    }
  }, [playerCount]);

  // Sounds

  // TODO: SOUND: what if 2 are triggered? which gets priority?

  const { setSoundToPlay } = useContext(SoundContext);

  // play sounds when other player joins or leaves
  useEffect(() => {
    if (playerCount === 1) {
      setSoundToPlay(playerLeaveSound);
    } else {
      setSoundToPlay(playerJoinSound);
    }
  }, [playerCount, setSoundToPlay]);
  // see also kickOpponentHandler for kick sound

  //// Externally available functions

  // when room owner starts a new game
  //  basically figure out who goes first and then call useGame's reset
  //  also update setWentFirst as may be needed for next such update
  function newGameHandler() {
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
    // call useGame's reset, then update own state
    resetGame(toGoFirst);
    setWentFirst(toGoFirst);
    publishMessage({ type: "newGame", toGoFirst });
  }

  function moveHandler(col) {
    // only act if it's your turn
    if (toPlayNext === 0) {
      placePiece(col, 0);
      publishMessage({ type: "move", col });
    }
  }

  function forfeitHandler(player) {
    forfeit(player);
    publishMessage({ type: "forfeit" });
  }

  function kickOpponentHandler() {
    setOpponent(null);
    publishMessage({ type: "kick" });
    setSoundToPlay(kickOpponentSound);
  }

  // Network

  const opponentInfoMessageHandler = (message) => {
    switch (message.type) {
      case "join":
        // add opponent (name and colour)
        const { name, colour } = message;
        setOpponent({ name, colour });
        // send own information (name and colour) out
        publishMessage({ ...player, type: "update" });
        // reset game
        //  note that this will send out a message saying who goes first
        newGameHandler();
        // NOTE: to provide Start Game button instead of auto-starting game
        //  on player join, change this (would require new gameStatus maybe)
        break;
      case "update":
      case "name":
      case "colour":
        // add name and colour
        setOpponent((opp) => {
          const name = message.name || opp.name;
          const colour = message.colour || opp.colour;
          return { name, colour };
        });
        break;
      case "leave":
        // remove opponent
        setOpponent(null);
        alert("Your opponent left.");
        // reset the game with arbitrary toPlayFirst
        //  note that on new player join, game will be reset again anyway
        //  but this prevents them potentially seeing old board state briefly
        //  also supplying 1 prevents them from somehow being able to make moves
        resetGame(1);
        break;
      default:
        break;
    }
  };

  // TODO: NEXT: these have 1 hard-coded, but above is generic though only used for 0
  //  has repeated code kind of

  const gameMessageHandler = (message) => {
    switch (message.type) {
      case "move":
        placePiece(message.col, 1);
        break;
      case "forfeit":
        forfeit(1);
        break;
      case "newGame":
        // each player is 0 to themselves, so need to flip it
        resetGame(1 - message.toGoFirst);
        setWentFirst(1 - message.toGoFirst);
        break;
      default:
        break;
    }
  };

  //// Return

  return {
    opponent,
    resultHistory,
    board,
    gameStatus,
    winner,
    toPlayNext,
    moveHandler,
    forfeitHandler,
    newGameHandler,
    kickOpponentHandler,
    opponentInfoMessageHandler,
    gameMessageHandler,
  };
}

export { useRoom };
