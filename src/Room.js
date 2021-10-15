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
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    placePiece,
    forfeit,
  } = game;

  //// OLD, to deal within

  function newGameHandler(gameStatus) {
    // TODO: redo this, after useRoom hook is refactored
    switch (restartMethod) {
      case "random":
        const player = Math.floor(Math.random() * 2);
        resetGame(player);
        setWentFirst(player);
        break;
      case "alternate":
        resetGame(1 - wentFirst);
        setWentFirst(1 - wentFirst);
        break;
      case "loser":
        if (gameStatus === "draw") {
          // if it's a draw, keep the same player
          resetGame(wentFirst);
        } else {
          resetGame(1 - gameStatus);
          setWentFirst(1 - gameStatus);
        }
        break;
      case "winner":
        if (gameStatus === "draw") {
          // if it's a draw, keep the same player
          resetGame(wentFirst);
        } else {
          resetGame(gameStatus);
        }
        break;
      default:
        console.log("New Game click handler didn't match any case.");
        resetGame(0);
    }
  }

  function forfeitHandler(player) {
    // TODO: redo this, after useRoom hook is refactored
    forfeit(player);
  }

  //// Return

  // header is room-based, board and footer and game-based
  // only show the latter pair if an opponent exists
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
          toPlayNext={toPlayNext}
          colours={["Blue", opponent.colour]} // TEMP: get blue from context
          placePiece={placePiece}
        />
      )}

      {playerCount === 2 && (
        <Footer
          viewer={0}
          isOwner={isOwner}
          gameStatus={gameStatus}
          winner={winner}
          toPlayNext={toPlayNext}
          forfeitHandler={forfeitHandler}
          newGameHandler={newGameHandler}
        />
      )}
    </>
  );
}

export default Room;
