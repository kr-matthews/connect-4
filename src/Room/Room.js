import { useEffect } from "react";

import RoomHeader from "./RoomHeader.js";
import Board from "./../Game/Board.js";
import SingleFooter from "./../Game/SingleFooter.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

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
  //// useRoom hook

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
    pubnub,
    roomCode,
    player,
    isOwner,
    opponent,
    setOpponent,
    restartMethod,
    setRestartMethod,
    unmountRoom
  );

  //// in-coming network (via pubnub)

  // PROBLEM: TODO: are await and try-catches necessary for (un)subscribing?

  // (un)subscribe to/from Room's channel
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    pubnub.subscribe({
      channels: [roomCode],
      withPresence: true,
    });

    return function unsubscribe() {
      pubnub.unsubscribe({ channels: [roomCode] });
    };
    // none will change while Room is mounted
  }, [pubnub, roomCode, unmountRoom]);

  // PROBLEM: TODO: are await and try-catches necessary for (un)listening?

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
