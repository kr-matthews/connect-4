import { useState, useEffect, useReducer, useCallback } from "react";

import { useGame } from "./../Game/useGame.js";

import createRoomSound from "./../sounds/success-1-6297.mp3";
import joinRoomSound from "./../sounds/good-6081.mp3";
import playerJoinSound from "./../sounds/chime-sound-7143.mp3";
import playerLeaveSound from "./../sounds/notification-sound-7062.mp3";
import kickOpponentSound from "./../sounds/fist-punch-or-kick-7171.mp3";
import closeRoomSound from "./../sounds/power-down-7103.mp3";
import leaveRoomSound from "./../sounds/notification-sound-7062.mp3";

// TODO: TEST: create tests for useRoom hook

//// Reducers

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

// used for both incoming and outgoing message queues
function reduceMessageQueue(state, action) {
  const newState = [...state];
  switch (action.type) {
    case "add":
      newState.push(action.message);
      break;
    case "remove":
      newState.shift();
      break;
    default:
      console.log("reduceMessageQueue: no match");
      console.log(action); // TEMP:
      break;
  }
  return newState;
}

//// Helpers for reducers

const initialResults = { wins: 0, draws: 0, loses: 0 };

//// useRoom custom hook
// is independent of network (ie pubnub)

function useRoom(
  player,
  isOwner,
  initialRestartMethod,
  setSoundToPlay,
  publishMessage,
  cleanupRoom,
  // first player of first game is random if unspecified
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
  // how to pick first player on new game
  //  only for user's information if not owner
  const [restartMethod, setRestartMethod] = useState(initialRestartMethod);
  // who started the current game (in case first player should alternate)
  const [wentFirst, setWentFirst] = useState(toPlayFirst);

  // the game custom hook
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    placePiece,
    setForfeiter,
  } = useGame(toPlayFirst, setSoundToPlay);

  // TODO: HOOK: NEXT: move useGame to Game.js (??)

  // message queues
  const [incomingMessageQueue, dispatchIncomingMessageQueue] = useReducer(
    reduceMessageQueue,
    []
  );
  const queueIncomingMessage = useCallback((message) => {
    dispatchIncomingMessageQueue({ type: "add", message });
  }, []);

  const [outgoingMessageQueue, dispatchOutgoingMessageQueue] = useReducer(
    reduceMessageQueue,
    []
  );
  const queueOutgoingMessage = useCallback((message) => {
    dispatchOutgoingMessageQueue({ type: "add", message });
  }, []);

  //// Network

  // incoming

  // act on a message
  function handleMessage(message) {
    console.log("Handling " + message.type); // TEMP:
    switch (message.type) {
      case "restartMethod":
        setRestartMethod(message.restartMethod);
        break;
      case "playerInfo":
        setOpponent((opp) => {
          const name = message.name || opp.name;
          const colour = message.colour || opp.colour;
          return { name, colour };
        });
        break;

      // room is relative to player, so 1 means opponent and incoming indices
      //  are flipped as they are from opponent's view
      case "start":
        resetGame(1 - message.toGoFirst);
        setWentFirst(1 - message.toGoFirst);
        break;
      case "move":
        placePiece(message.col, 1);
        break;
      case "forfeit":
        setForfeiter(1);
        break;

      case "kick":
        alert("The owner of the room kicked you out.");
        cleanupRoom();
        break;
      case "close":
        alert("The owner of the room left and so the room has closed.");
        cleanupRoom();
        break;

      case "leave":
        setOpponent(null);
        alert("Your opponent left.");
        resetGame(1); // TODO: reset with new "waiting" gameStatus or whatever
        break;
      default:
        break;
    }
  }

  // outgoing

  // if there are outgoing messages, send the first one (oldest)
  useEffect(() => {
    console.log("Side effect for outgoing messages.");
    if (outgoingMessageQueue.length > 0) {
      publishMessage(outgoingMessageQueue[0]);
      dispatchOutgoingMessageQueue({ type: "remove" });
    }
  });

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

  // play sounds when other player joins or leaves
  useEffect(() => {
    if (playerCount === 1) {
      // TODO: SOUND: don't play leave sounds on initial render
      setSoundToPlay(playerLeaveSound);
    } else {
      setSoundToPlay(playerJoinSound);
    }
  }, [playerCount, setSoundToPlay]);

  // play create/join sounds (should only run once, as both dependencies never change)
  useEffect(() => {
    if (isOwner) {
      setSoundToPlay(createRoomSound);
    } else {
      setSoundToPlay(joinRoomSound);
    }
  }, [isOwner, setSoundToPlay]);

  // incoming messages

  // if there are incoming messages, act on the first one (oldest)
  useEffect(() => {
    if (incomingMessageQueue.length > 0) {
      if (incomingMessageQueue[0].uuid !== player.uuid) {
        // don't act on your own messages
        handleMessage(incomingMessageQueue[0]);
      }
      dispatchIncomingMessageQueue({ type: "remove" });
    }
  });

  // outgoing messages

  // send restartMethod when opponent joins your room (only playerCount changes)
  useEffect(() => {
    if (isOwner && playerCount === 2) {
      queueOutgoingMessage({ type: "restartMethod", restartMethod });
    }
  }, [isOwner, queueOutgoingMessage, playerCount, restartMethod]);
  // send player name/colour on update and on player join (and initial render)
  useEffect(() => {
    if (playerCount === 2 || !isOwner) {
      queueOutgoingMessage({
        type: "playerInfo",
        name: player.name,
        colour: player.colour,
      });
    }
  }, [isOwner, queueOutgoingMessage, playerCount, player.name, player.colour]);

  //// Externally available functions, for this player's actions

  // for owner to use to start a new game
  function startNewGame() {
    // figure out who will go first
    let toGoFirst = null;
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

    // update own state
    resetGame(toGoFirst);
    setWentFirst(toGoFirst);
    // send message to opponent
    publishMessage({ type: "start", toGoFirst });
  }

  function makeMove(col) {
    // only act if it's your turn
    if (toPlayNext === 0) {
      placePiece(col, 0);
      publishMessage({ type: "move", col });
    }
  }

  function forfeit() {
    setForfeiter();
    publishMessage({ type: "forfeit" });
  }

  // TODO: LATER: add "permaKickOpponent" via uuid-check (not perfect)

  function kickOpponent() {
    setOpponent(null);
    publishMessage({ type: "kick" });
    setSoundToPlay(kickOpponentSound);
  }

  function closeRoom() {
    publishMessage({ type: "close" });
    cleanupRoom();
    setSoundToPlay(closeRoomSound);
  }

  function leaveRoom() {
    publishMessage({ type: "leave" });
    cleanupRoom();
    setSoundToPlay(leaveRoomSound);
  }

  //// Return

  return {
    opponent,
    resultHistory,
    restartMethod,
    board,
    gameStatus,
    winner,
    toPlayNext,
    startNewGame,
    makeMove,
    forfeit,
    kickOpponent,
    queueIncomingMessage,
    closeRoom,
    leaveRoom,
  };
}

export { useRoom };
