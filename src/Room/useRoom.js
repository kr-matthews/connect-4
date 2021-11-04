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
      console.log("Error: no match for reduceMessageQueue.");
      break;
  }
  return newState;
}

//// Helpers for reducers

const initialResults = { wins: 0, draws: 0, loses: 0 };

//// useRoom custom hook
// is independent of network (ie pubnub)

// TODO: NEXT: pass view to useRoom and make it relative

function useRoom(
  player,
  isOwner,
  initialRestartMethod,
  setSoundToPlay,
  publishMessage,
  cleanupRoom
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
  // who start(s/ed) the current game -- first player of first game is random
  const [toPlayFirst, setToPlayFirst] = useState(null);

  // TODO: NEXT: confirm this is re-randomized on new opponent join

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

  // TODO: HOOK: NEXT: NEXT: move useGame to Game.js (??)

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
        setToPlayFirst(1 - message.toPlayFirst);
        resetGame();
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
        alert("Your opponent left.");
        setOpponent(null); // this unmounts the Game component and useGame hook
        break;
      default:
        console.log("Error: Unhandled message.");
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

  // first player

  // randomize first player when opponent joins your room
  useEffect(() => {
    if (isOwner && playerCount === 2) {
      setToPlayFirst(Math.floor(Math.random() * 2));
    }
    // only playerCount changes when isOwner
  }, [isOwner, playerCount]);

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

  // send restartMethod when opponent joins your room
  useEffect(() => {
    if (isOwner && playerCount === 2) {
      queueOutgoingMessage({ type: "restartMethod", restartMethod });
    }
    // only playerCount will change when isOwner
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
    // only playerCount and player will change
  }, [isOwner, queueOutgoingMessage, playerCount, player.name, player.colour]);
  // send toPlayFirst when new game starts (only toPlayFirst/gameStatus change)
  useEffect(() => {
    if (isOwner && gameStatus === "ongoing") {
      queueOutgoingMessage({ type: "start", toPlayFirst });
    }
    // toPlayFirst won't change while gameStatus is ongoing
  }, [isOwner, queueOutgoingMessage, toPlayFirst, gameStatus]);

  //// Externally available functions, for this player's actions

  // for owner to use to start a new game
  function startNewGame() {
    // figure out who will go first
    setToPlayFirst((wentFirst) => {
      switch (restartMethod) {
        case "random":
          return Math.floor(Math.random() * 2);
        case "alternate":
          return 1 - wentFirst;
        case "loser":
          // if it's a draw, keep the same player
          return gameStatus === "draw" ? wentFirst : 1 - winner;
        case "winner":
          // if it's a draw, keep the same player
          return gameStatus === "draw" ? wentFirst : winner;
        default:
          console.log("Error: New Game couldn't select first player properly.");
          return 1 - wentFirst;
      }
    });
    resetGame();
  }

  function makeMove(col) {
    // only act if it's your turn
    if (toPlayNext === 0) {
      placePiece(col, 0);
      publishMessage({ type: "move", col });
    }
  }

  function forfeit() {
    setForfeiter(0);
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
