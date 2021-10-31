import { useState, useEffect, useCallback } from "react";
import { usePubNub } from "pubnub-react";

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
  restartMethod,
  closeRoomHandler,
  leaveRoomHandler,
}) {
  // get pubnub object from PubNubProvider Context in App.js
  const pubnub = usePubNub();

  //// out-going network

  const publishMessage = useCallback(
    (message) => {
      pubnub.publish({
        message: { ...message, uuid: player.uuid },
        channel: roomCode,
      });
      console.log("Sent message of type " + message.type); // TEMP:
    },
    [player.uuid, pubnub, roomCode]
  );

  //// useRoom hook

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
    opponentInfoMessageHandler,
  } = useRoom(player, restartMethod, publishMessage);

  //// in-coming network

  // TODO: should this (and parts above) be inside one of the hooks?

  // hold most recent message about opponent changes
  const [opponentInfoMessage, setOpponentInfoMessage] = useState(null);
  // check for messages about opponent updates
  useEffect(() => {
    console.log("PubNub updated."); // TEMP:
    function messageHandler(event) {
      switch (event.message.type) {
        case "join":
        case "update":
        case "name":
        case "colour":
        case "leave":
          console.log("Received opponent information.");
          setOpponentInfoMessage(event.message);
          break;
        default:
          break;
      }
    }
    pubnub.addListener({ message: messageHandler });
  }, [pubnub]);
  // handle most recent message about opponent changes
  useEffect(() => {
    if (opponentInfoMessage && opponentInfoMessage.uuid !== player.uuid) {
      opponentInfoMessageHandler(opponentInfoMessage);
    }
    setOpponentInfoMessage(null);
  }, [opponentInfoMessage, opponentInfoMessageHandler, player.uuid]);

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
