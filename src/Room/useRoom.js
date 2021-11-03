import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useContext,
} from "react";

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
  publishMessage,
  closeRoom,
  initialRestartMethod = null,
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
    forfeit,
  } = useGame(toPlayFirst);

  // message queue
  const [messageQueue, dispatchMessageQueue] = useReducer(
    reduceMessageQueue,
    []
  );
  const queueMessage = useCallback((message) => {
    dispatchMessageQueue({ type: "add", ...message });
  }, []);

  // console.log("Re-render."); // TEMP:
  // console.log(JSON.parse(JSON.stringify(messageQueue))); // TEMP:

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

  // if there are messages, act on the first one (oldest)
  useEffect(() => {
    if (messageQueue.length > 0) {
      if (messageQueue[0].uuid !== player.uuid) {
        // don't act on your own messages
        console.log("Getting 1st: " + messageQueue[0].type); // TEMP:
        handleMessage(messageQueue[0]);
      }
      console.log("Removing 1st: " + messageQueue[0].type); // TEMP:
      dispatchMessageQueue({ type: "remove" });
    }
  });

  // TODO: NEXT: these have 1 hard-coded, but above is generic though only used for 0
  //  has repeated code kind of

  // act on a message
  function handleMessage(message) {
    console.log("Handling " + message.type); // TEMP:
    console.log(JSON.parse(JSON.stringify(message))); // TEMP:
    switch (message.type) {
      case "join":
        // add opponent (name and colour)
        const { name, colour } = message;
        setOpponent({ name, colour });
        // send own information (name and colour, + restartMethod) out
        publishMessage({ ...player, type: "update", restartMethod });
        // reset game -- note that this will send out a message saying who goes first
        newGameHandler();
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
        // update restartMethod
        if (message.type === "update") {
          setRestartMethod(message.restartMethod);
        }
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
      case "kick":
        alert("The owner of the room kicked you out.");
        closeRoom();
        break;
      case "close":
        alert("The owner of the room left and so the room has closed.");
        closeRoom();
        break;
      default:
        break;
    }
  }

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
    queueMessage,
    restartMethod,
  };
}

export { useRoom };
