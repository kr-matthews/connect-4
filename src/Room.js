import { useState, useReducer } from "react";

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
      let newState = { ...state };
      newState[action.type] += 1;
      return newState;
  }
}

const initialResults = { wins: 0, draws: 0, loses: 0 };

// TODO: NEXT:?? useRoom hook? and put useGame call within that?

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({ roomId, restartMethod, firstPlayer }) {
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
  const {
    gameStatus,
    toPlayNext,
    board,
    // moveHistory, // TEMP: hide
    resetGame,
    placePiece,
  } = useGame(firstPlayer);
  // history of all games played
  const [resultHistory, dispatchResult] = useReducer(
    resultReducer,
    initialResults
  );

  //// Return

  return (
    <>
      <h2>Room</h2>
      <Header
        playerCount={playerCount}
        opponent={opponent}
        resultHistory={resultHistory}
      />
      <Board
        viewer={0}
        board={board}
        placePiece={placePiece}
        colours={["Blue", opponent.colour]} // TEMP: get blue from context
        toPlayNext={toPlayNext}
      />
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
    </>
  );
}

export default Room;
