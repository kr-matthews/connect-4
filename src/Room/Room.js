import { useEffect, useCallback } from "react";

import RoomHeader from "./RoomHeader.js";
import Game from "./../Game/Game.js";
import Board from "./../Game/Board.js";
import GameFooter from "./../Game/GameFooter.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({
  player,
  isOwner,
  roomCode,
  closeRoomHandler,
  leaveRoomHandler,
  closeRoom,
  pubnub,
}) {
  //// out-going network (via pubnub)

  const publishMessage = useCallback(
    (message) => {
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
  } = useRoom(player, publishMessage, closeRoom);

  //// in-coming network (via pubnub)

  useEffect(() => {
    function handleMessage(event) {
      console.log("Queueing " + event.message.type); // TEMP:
      queueMessage(event.message);
    }
    const listener = { message: handleMessage };
    pubnub.addListener(listener);
    return function cleanupListener() {
      pubnub.removeListener(listener);
    };
    // note that queueMessage never changes
  }, [pubnub, queueMessage]);

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
        kickOpponentHandler={kickOpponentHandler}
        closeRoomHandler={closeRoomHandler}
        leaveRoomHandler={leaveRoomHandler}
      />

      {opponent && (
        <Game>
          <Board
            viewer={0}
            board={board}
            isViewersTurn={0 === toPlayNext}
            colours={[player.colour, opponent.colour]}
            moveHandler={moveHandler}
          />
          <GameFooter
            viewer={0}
            isOwner={isOwner}
            gameStatus={gameStatus}
            winner={winner}
            toPlayNext={toPlayNext}
            forfeitHandler={forfeitHandler}
            newGameHandler={newGameHandler}
          />
        </Game>
      )}
    </>
  );
}

export default Room;
