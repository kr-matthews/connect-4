import { useReducer, useEffect, useCallback } from "react";

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

function useReceiveMessages(
  network,
  roomCode,
  uuid,
  hasOpponent,
  setOpponent,
  resetRoom,
  startGame,
  placePiece,
  setForfeiter,
  setRestartMethod,
  unmountRoom
) {
  //// Constants

  // message queue
  const [incomingMessageQueue, dispatchIncomingMessageQueue] = useReducer(
    reduceMessageQueue,
    []
  );

  //// Functions

  // queue message
  const queueIncomingMessage = useCallback((message) => {
    dispatchIncomingMessageQueue({ type: "add", message });
  }, []);
  // act on message
  function handleMessage(message) {
    switch (message.type) {
      case "restartMethod":
        setRestartMethod(message.restartMethod);
        break;
      case "playerInfo":
        setOpponent((opp) => {
          const name = message.name || opp.name;
          const colour = message.colour || opp.colour;
          const type = "remote";
          return { name, colour, type };
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

  // if there are incoming messages, act on the first one (oldest)
  useEffect(() => {
    if (incomingMessageQueue.length > 0) {
      if (incomingMessageQueue[0].uuid !== uuid) {
        // don't act on your own messages
        handleMessage(incomingMessageQueue[0]);
      }
      dispatchIncomingMessageQueue({ type: "remove" });
    }
  });

  // PROBLEM: TODO: are await and try-catches necessary for (un)subscribing?

  // (un)subscribe to/from Room's channel
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    network.subscribe({
      channels: [roomCode],
      withPresence: true,
    });

    return function unsubscribe() {
      network.unsubscribe({ channels: [roomCode] });
    };
    // none will change while Room is mounted
  }, [network, roomCode, unmountRoom]);

  // PROBLEM: TODO: are await and try-catches necessary for (un)listening?

  // setup listener for messages
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    function handleMessage(event) {
      queueIncomingMessage(event.message);
    }
    const listener = { message: handleMessage };

    network.addListener(listener);

    return function cleanupListener() {
      network.removeListener(listener);
    };
    // none will change while Room is mounted
  }, [network, queueIncomingMessage, unmountRoom]);
}

export { useReceiveMessages };
