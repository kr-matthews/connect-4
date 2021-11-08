import { useEffect, useCallback, useContext } from "react";

import RoomHeader from "./RoomHeader.js";
import Board from "./../Game/Board.js";
import SingleFooter from "./../Game/SingleFooter.js";

import { SoundContext } from "./../App.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

// TODO: NEXT: LEAK: memory leak in Room, review subscriptions and async tasks around unmounts

function Room({
  roomCode,
  player,
  isOwner,
  opponent,
  setOpponent,
  restartMethod,
  setRestartMethod,
  unmountRoom,
  pubnub,
}) {
  //// sounds

  const { setSoundToPlay } = useContext(SoundContext);

  //// out-going network (via pubnub)

  const publishMessage = useCallback(
    async (message) => {
      try {
        await pubnub.publish({
          message: { ...message, uuid: player.uuid },
          channel: roomCode,
        });
      } catch (error) {
        console.error("Couldn't publish message.", error);
        alert(
          "Could not send '" +
            message.type +
            "' message to opponent.\nYou may be out of sync with your opponent.\nConsider closing the room and creating a new one, if you haven't already."
        );
      }
    },
    // none will change until Room unmounts
    [player.uuid, pubnub, roomCode]
  );

  //// useRoom hook (agnostic of network choice)

  const {
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
  } = useRoom(
    player,
    isOwner,
    opponent,
    setOpponent,
    restartMethod,
    setRestartMethod,
    setSoundToPlay,
    publishMessage,
    unmountRoom
  );

  //// in-coming network (via pubnub)

  // (un)subscribe to Room's channel
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    // would call subscribe directly, but can't do so for async functions
    async function subscribe() {
      try {
        await pubnub.subscribe({
          channels: [roomCode],
          withPresence: true,
        });
        return function cleanupSubscription() {
          pubnub.unsubscribe({ channels: [roomCode] });
        };
      } catch (error) {
        console.error("Couldn't subscribe.", error);
        alert("Could not listen for messages from opponent. Closing room.");
        unmountRoom();
      }
    }

    return subscribe();
    // none will change while Room is mounted
  }, [pubnub, roomCode, isOwner, publishMessage, setSoundToPlay, unmountRoom]);

  // setup listener for messages
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    function handleMessage(event) {
      queueIncomingMessage(event.message);
    }
    const listener = { message: handleMessage };
    async function listen() {
      try {
        await pubnub.addListener(listener);
        return function cleanupListener() {
          pubnub.removeListener(listener);
        };
      } catch (error) {
        console.error("Couldn't add listener.", error);
        alert("Could not listen for messages from opponent. Closing room.");
        unmountRoom();
      }
    }

    return listen();
    // note that none of these ever change
  }, [pubnub, queueIncomingMessage, unmountRoom]);

  //// Return

  return (
    <>
      <RoomHeader
        roomCode={roomCode}
        isOwner={isOwner}
        hasOpponent={opponent !== null}
        restartMethod={restartMethod}
        resultHistory={resultHistory}
        kickOpponent={kickOpponent}
        closeRoom={unmountRoom}
        leaveRoom={unmountRoom}
      />
      {opponent && (
        <Board
          viewer={0}
          board={board}
          isViewersTurn={0 === toPlayNext}
          colours={[player.colour, opponent.colour]}
          makeMove={makeMove}
        />
      )}
      {opponent && (
        <SingleFooter
          viewer={0}
          isOwner={isOwner}
          gameStatus={gameStatus}
          winner={winner}
          toPlayNext={toPlayNext}
          forfeit={forfeit}
          startNewGame={startNewGame}
          hasChoice={false}
        />
      )}
    </>
  );
}

export default Room;
