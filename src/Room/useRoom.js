import { useEffect, useReducer, useCallback } from "react";

import { useGame } from "./../Game/useGame.js";
import { useGameSoundEffects } from "./../Game/useGameSoundEffects.js";
import { useSendMessages } from "./useSendMessages.js";
import { useResults } from "./../Game/useResults.js";

import createRoomSound from "./../sounds/success-1-6297.mp3";
import joinRoomSound from "./../sounds/good-6081.mp3";
import playerJoinSound from "./../sounds/chime-sound-7143.mp3";
import playerLeaveSound from "./../sounds/notification-sound-7062.mp3";
import kickOpponentSound from "./../sounds/fist-punch-or-kick-7171.mp3";
import closeRoomSound from "./../sounds/power-down-7103.mp3";
import leaveRoomSound from "./../sounds/notification-sound-7062.mp3";

// TODO: TEST: useRoom: create tests for custom hook

// TODO: NEXT: move sounds into custom hook

//// Reducers

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
      console.error("No match for reduceMessageQueue.", action);
      break;
  }
  return newState;
}

//// useRoom custom hook
// is independent of network (ie pubnub)

function useRoom(
  network,
  roomCode,
  player,
  isOwner,
  opponent,
  setOpponent,
  restartMethod,
  setRestartMethod,
  setSoundToPlay,
  unmountRoom
) {
  // is an opponent present?
  const hasOpponent = opponent !== null;

  //// custom hooks
  const {
    board,
    gameStatus,
    prevMove,
    toPlayFirst,
    toPlayNext,
    winner,
    resetGame,
    startGame,
    placePiece,
    setForfeiter,
  } = useGame();

  useGameSoundEffects(false, gameStatus, toPlayNext, winner);

  useSendMessages(
    network,
    roomCode,
    player,
    isOwner,
    hasOpponent,
    gameStatus,
    prevMove,
    toPlayFirst,
    winner,
    restartMethod
  );

  // history of all games played
  const { resultHistory, resetResults } = useResults(gameStatus, winner);

  // message queues
  const [incomingMessageQueue, dispatchIncomingMessageQueue] = useReducer(
    reduceMessageQueue,
    []
  );
  const queueIncomingMessage = useCallback((message) => {
    dispatchIncomingMessageQueue({ type: "add", message });
  }, []);

  // const [outgoingMessageQueue, dispatchOutgoingMessageQueue] = useReducer(
  //   reduceMessageQueue,
  //   []
  // );
  // const queueOutgoingMessage = useCallback((message) => {
  //   dispatchOutgoingMessageQueue({ type: "add", message });
  // }, []);

  //// Network

  // incoming

  // act on a message
  function handleMessage(message) {
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
        startGame(1 - message.toPlayFirst);
        break;
      case "move":
        placePiece(message.col, 1);
        break;
      case "forfeit":
        setForfeiter(1);
        break;

      case "kick":
        alert("The owner of the room kicked you out.");
        unmountRoom();
        break;
      case "close":
        alert("The owner of the room left and so the room has closed.");
        unmountRoom();
        break;

      case "leave":
        if (hasOpponent) {
          alert("Your opponent left.");
          resetRoom();
        }
        break;
      default:
        console.error("Unhandled message.", message);
        break;
    }
  }

  // cleanup

  // on unmount of Room, play sound
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    return function cleanup() {
      setSoundToPlay(isOwner ? closeRoomSound : leaveRoomSound);
    };
    // none of these will change while Room is mounted
  }, [isOwner, setSoundToPlay]);

  //// Effects

  // result history (increments are done in the hook)

  // if opponent leaves, reset
  useEffect(() => {
    if (!hasOpponent) {
      resetResults();
    }
    // resetResults never changes
  }, [hasOpponent, resetResults]);

  // Sounds

  // play sounds when other player joins or leaves
  useEffect(() => {
    if (isOwner && !hasOpponent) {
      // NOTE: this sound is overridden by createRoomSound on first rener (?)
      setSoundToPlay(playerLeaveSound);
    } else if (isOwner && hasOpponent) {
      setSoundToPlay(playerJoinSound);
    }
  }, [isOwner, hasOpponent, setSoundToPlay]);

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

  //// Helper functions

  // will only be called by owner
  function resetRoom() {
    setOpponent(null);
    resetGame();
  }

  //// Externally available functions, for this player's actions

  function startNewGame() {
    startGame(restartMethod);
  }

  function makeMove(col) {
    // only act if it's your turn
    if (toPlayNext === 0) {
      placePiece(col, 0);
    }
  }

  function forfeit() {
    setForfeiter(0);
  }

  // TODO: LATER: PERMAKICK: add via uuid-check (not perfect)

  function kickOpponent() {
    resetRoom();
    setSoundToPlay(kickOpponentSound);
  }

  //// Return

  return {
    resultHistory,
    board,
    gameStatus,
    winner,
    toPlayNext,
    startNewGame,
    makeMove,
    forfeit,
    kickOpponent,
    queueIncomingMessage,
  };
}

export { useRoom };
