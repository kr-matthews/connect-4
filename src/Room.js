// import { useState, useReducer, useEffect } from "react";

import RoomHeader from "./RoomHeader.js";
import Game from "./Game.js";
import Board from "./Board.js";
import GameFooter from "./GameFooter.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({ player, isOwner, roomId, restartMethod }) {
  //// Constants

  const {
    opponent, // TODO: initialize and update -- involves network
    resultHistory,
    board,
    gameStatus,
    winner,
    toPlayNext,
    moveHandler,
    forfeitHandler,
    newGameHandler,
    kickOpponentHandler,
    closeRoomHandler,
  } = useRoom(restartMethod);

  //// Return

  // header is room-based, board and footer and game-based
  // only show the latter pair if an opponent exists
  return (
    <>
      <h2>Room</h2>
      <RoomHeader
        isOwner={isOwner}
        opponent={opponent}
        restartMethod={restartMethod}
        resultHistory={resultHistory}
        closeRoomHandler={closeRoomHandler}
        kickOpponentHandler={kickOpponentHandler}
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
