// import { useState, useReducer, useEffect } from "react";

import Header from "./Header.js";
import Board from "./Board.js";
import Footer from "./Footer.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({ isOwner, roomId, restartMethod }) {
  //// States
  // room
  const {
    game,
    playerCount,
    opponent,
    resultHistory,
    wentFirst,
    setWentFirst,
    dispatchResult,
  } = useRoom();
  // game, called within room hook
  const { gameStatus, toPlayNext, board, resetGame, placePiece } = game;
  //// Return

  return (
    <>
      <h2>Room</h2>
      <Header
        isOwner={isOwner}
        playerCount={playerCount}
        opponent={opponent}
        restartMethod={restartMethod}
        resultHistory={resultHistory}
      />
      {playerCount === 2 && (
        <Board
          viewer={0}
          board={board}
          placePiece={placePiece}
          colours={["Blue", opponent.colour]} // TEMP: get blue from context
          toPlayNext={toPlayNext}
        />
      )}
      {playerCount === 2 && (
        <Footer
          viewer={0}
          toPlayNext={toPlayNext}
          gameStatus={gameStatus}
          resetGame={resetGame}
          restartMethod={restartMethod}
          wentFirst={wentFirst}
          setWentFirst={setWentFirst}
          dispatchResult={dispatchResult}
        />
      )}
    </>
  );
}

export default Room;
