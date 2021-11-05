import { useEffect, useCallback, useContext } from "react";

import RoomHeader from "./RoomHeader.js";
import Board from "./../Game/Board.js";
import RoomFooter from "./RoomFooter.js";

import { SoundContext } from "./../App.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({
  player,
  roomCode,
  isOwner,
  initialRestartMethod,
  unmountRoom,
  pubnub,
}) {
  //// sounds

  const { setSoundToPlay } = useContext(SoundContext);

  //// out-going network (via pubnub)

  const publishMessage = useCallback(
    (message) => {
      pubnub.publish({
        message: { ...message, uuid: player.uuid },
        channel: roomCode,
      });
    },
    // none will change until Room unmounts
    [player.uuid, pubnub, roomCode]
  );

  //// useRoom hook (agnostic of network choice)

  const {
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
  } = useRoom(
    player,
    isOwner,
    initialRestartMethod,
    setSoundToPlay,
    publishMessage,
    unmountRoom
  );

  //// in-coming network (via pubnub)

  // (un)subscribe to Room's channel
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    pubnub.subscribe({
      channels: [roomCode],
      withPresence: true,
    });
    return function cleanupSubscription() {
      pubnub.unsubscribe({ channels: [roomCode] });
    };
    // none will change while Room is mounted
  }, [pubnub, roomCode, isOwner, publishMessage, setSoundToPlay]);

  // setup listener for messages
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    function handleMessage(event) {
      queueIncomingMessage(event.message);
    }
    const listener = { message: handleMessage };
    pubnub.addListener(listener);
    return function cleanupListener() {
      pubnub.removeListener(listener);
    };
    // note that neither of these ever change
  }, [pubnub, queueIncomingMessage]);

  //// Return

  return (
    <>
      <h2>Room</h2>
      <RoomHeader
        roomCode={roomCode}
        isOwner={isOwner}
        opponent={opponent}
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
        <RoomFooter
          viewer={0}
          isOwner={isOwner}
          gameStatus={gameStatus}
          winner={winner}
          toPlayNext={toPlayNext}
          forfeit={forfeit}
          startNewGame={startNewGame}
        />
      )}
    </>
  );
}

export default Room;
