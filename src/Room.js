import { useState, useReducer } from "react";

import Header from "./Header.js";
import Board from "./Board.js";
import Footer from "./Footer.js";

import { useGame } from "./useGame.js";

function Room({ creator }) {
  // TODO: Room component

  // TODO: keep playerCount and players up-to-date (useEffect?)
  // TODO: allow player 0 to pick who goes first

  // how many players are present
  // TEMP: initial state
  const [playerCount, setPlayerCount] = useState(1);
  // index to access self in players array
  const selfIndex = creator ? 0 : 1;
  // other player's name and colour, once they join
  // TEMP: initial state
  const [players, setPlayers] = useReducer(playersDispatch, [
    { name: "Alice", colour: "blue" },
    { name: "Bob", colour: "red" },
  ]);
  // the game custom hook
  // TEMP: argument of 0 (index of first palyer)
  const {
    gameStatus,
    toPlayNext,
    board,
    moveHistory,
    resetGame,
    placePiece,
  } = useGame(0);

  function playersDispatch(state, action) {
    let newState = [...state];
    newState[action.player][action.property] = action.value;
    return newState;
  }

  return (
    <>
      <h2>Room</h2>
      <Header />
      <Board
        board={board}
        placePiece={placePiece}
        colours={[players[0].colour, players[1].colour]}
        toPlayNext={toPlayNext}
      />
      <Footer resetGame={resetGame} />
    </>
  );
}

export default Room;
