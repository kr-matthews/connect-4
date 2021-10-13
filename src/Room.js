import { useState, useReducer, useEffect } from "react";

import Header from "./Header.js";
import Board from "./Board.js";
import Footer from "./Footer.js";

import { useGame } from "./useGame.js";

//// reducers

function opponentReducer(state, action) {
  let newState = [...state];
  newState[action.property] = action.value;
  return newState;
}

function resultReducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialResults;
    default:
      // win, draw, or lose
      let newState = { ...state };
      newState[action.type + "s"] += 1;
      return newState;
  }
}

const initialResults = { wins: 0, draws: 0, loses: 0 };

// TODO: NEXT:?? useRoom hook? and put useGame call within that?

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({ isOwner, roomId, restartMethod, firstPlayer }) {
  // TODO: keep playerCount and opponent updated -- involves network

  //// States

  // how many players are present
  // TEMP: initial state -- should be 2 if joining someone else's room
  const [playerCount, setPlayerCount] = useState(2);
  // other player's name and colour, once they join
  // TEMP: initial state -- should check network and be null if necessary
  const [opponent, dispatchOpponent] = useReducer(opponentReducer, {
    name: "Bob",
    colour: "red",
  });
  // who started the current game (in case first player should alternate)
  const [wentFirst, setWentFirst] = useState(firstPlayer);
  // the game custom hook
  const [resultHistory, dispatchResult] = useReducer(
    resultReducer,
    initialResults
  );
  const {
    gameStatus,
    toPlayNext,
    board,
    // moveHistory, // TEMP: hide
    resetGame,
    placePiece,
  } = useGame(firstPlayer);
  // history of all games played

  //// Effects

  // (only) when gameStatus changes, update the W-D-L tally
  useEffect(() => {
    switch (gameStatus) {
      case 0:
        // TODO: add sounds for each end-game case
        dispatchResult({ type: "win" });
        break;
      case 1:
        dispatchResult({ type: "lose" });
        break;
      case "draw":
        dispatchResult({ type: "draw" });
        break;
      default:
    }
  }, [gameStatus]);

  // play sounds when it becomes your turn to play (opponent moves, or new game)
  useEffect(() => {
    if (toPlayNext === 0) {
      // TODO: your turn sound
    }
  }, [toPlayNext]);
  useEffect(() => {
    if (playerCount === 1) {
      // TODO: player leaving sound
    } else {
      // TODO: player joining sound
    }
  }, [playerCount]);

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
