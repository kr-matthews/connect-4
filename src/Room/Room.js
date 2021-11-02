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
    gameMessageHandler,
  } = useRoom(player, restartMethod, publishMessage);

  //// in-coming network

  // TODO: should this (and parts above) be inside one of the hooks?

  // hold most recent message about opponent changes
  const [opponentInfoMessage, setOpponentInfoMessage] = useState(null);
  // hold most recent message about game
  const [gameMessage, setGameMessage] = useState(null);

  // check for messages about opponent updates
  useEffect(() => {
    function messageHandler(event) {
      switch (event.message.type) {
        case "join":
        case "update":
        case "name":
        case "colour":
        case "leave":
          setOpponentInfoMessage(event.message);
          break;
        default:
          break;
      }
    }
    const listener = { message: messageHandler };
    pubnub.addListener(listener);
    return function cleanup() {
      pubnub.removeListener(listener);
    };
  }, [pubnub]);
  // check for messages about game
  useEffect(() => {
    function messageHandler(event) {
      switch (event.message.type) {
        case "move":
        case "forfeit":
        case "newGame":
          setGameMessage(event.message);
          break;
        default:
          break;
      }
    }
    const listener = { message: messageHandler };
    pubnub.addListener(listener);
    return function cleanup() {
      pubnub.removeListener(listener);
    };
  }, [pubnub]);

  // handle most recent message about opponent changes
  useEffect(() => {
    if (opponentInfoMessage && opponentInfoMessage.uuid !== player.uuid) {
      opponentInfoMessageHandler(opponentInfoMessage);
    }
    if (opponentInfoMessage) {
      // without this check, might nullify a message which was set earlier in this re-render
      setOpponentInfoMessage(null);
    }
    // could wrap opponentInfoMessageHandler (and recursive dependencies) in a callback
  }, [opponentInfoMessage, opponentInfoMessageHandler, player.uuid]);
  // handle most recent message about game
  useEffect(() => {
    if (gameMessage && gameMessage.uuid !== player.uuid) {
      gameMessageHandler(gameMessage);
    }
    if (gameMessage) {
      // without this check, might nullify a message which was set earlier in this re-render
      setGameMessage(null);
    }
    // could wrap gameMessageHandler (and recursive dependencies) in a callback
  }, [gameMessage, gameMessageHandler, player.uuid]);

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
