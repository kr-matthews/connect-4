import { useEffect, useReducer, useCallback } from "react";

import { useGame } from "./../Game/useGame.js";
import { useGameSoundEffects } from "./../Game/useGameSoundEffects.js";
import { useRoomSoundEffects } from "./useRoomSoundEffects.js";
import { useSendMessages } from "./useSendMessages.js";
import { useResults } from "./../Game/useResults.js";

// TODO: TEST: useRoom: create tests for custom hook

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

  useRoomSoundEffects(isOwner, hasOpponent);

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

  //// Effects

  // result history (increments are done in the hook)

  // if opponent leaves, reset
  useEffect(() => {
    if (!hasOpponent) {
      resetResults();
    }
    // resetResults never changes
  }, [hasOpponent, resetResults]);

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

  // TODO: NEXT: PERMAKICK: add via uuid-check (not perfect) ??
  // TODO: NEXT: use purmakick list to play kick sound ??

  function kickOpponent() {
    resetRoom();
    // setSoundToPlay(kickOpponentSound); // TODO: NEXT: TEMP
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
