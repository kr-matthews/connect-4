import { useEffect, useCallback, useContext } from "react";

import RoomHeader from "./RoomHeader.js";
import Game from "./../Game/Game.js";
import Board from "./../Game/Board.js";
import GameFooter from "./../Game/GameFooter.js";

import { SoundContext } from "./../App.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({
  player,
  roomCode,
  isOwner,
  initialRestartMethod,
  cleanupRoom,
  pubnub,
}) {
  //// sounds

  const { setSoundToPlay } = useContext(SoundContext);

  //// out-going network (via pubnub)

  const publishMessage = useCallback(
    (message) => {
      console.log("Publishing " + message.type); // TEMP:
      pubnub.publish({
        message: { ...message, uuid: player.uuid },
        channel: roomCode,
      });
    },
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
    closeRoom,
    leaveRoom,
  } = useRoom(
    player,
    isOwner,
    initialRestartMethod,
    setSoundToPlay,
    publishMessage,
    cleanupRoom
  );

  //// in-coming network (via pubnub)

  useEffect(() => {
    console.log("Running listener side effect."); // TEMP:
    function handleMessage(event) {
      console.log("Queueing " + event.message.type); // TEMP:
      queueIncomingMessage(event.message);
    }
    const listener = { message: handleMessage };
    pubnub.addListener(listener);
    return function cleanupListener() {
      pubnub.removeListener(listener);
    };
    // note that queueIncomingMessage never changes
  }, [pubnub, queueIncomingMessage]);

  //// Return

  // TODO: NEXT: remove Game and have 3 children (RoomFooter)

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
        closeRoom={closeRoom}
        leaveRoom={leaveRoom}
      />

      {opponent && (
        <Game>
          <Board
            viewer={0}
            board={board}
            isViewersTurn={0 === toPlayNext}
            colours={[player.colour, opponent.colour]}
            makeMove={makeMove}
          />
          <GameFooter
            viewer={0}
            isOwner={isOwner}
            gameStatus={gameStatus}
            winner={winner}
            toPlayNext={toPlayNext}
            forfeit={forfeit}
            startNewGame={startNewGame}
          />
        </Game>
      )}
    </>
  );
}

export default Room;
