import { useState, useContext } from "react";

import ComputerHeader from "./ComputerHeader.js";
import Board from "./../Game/Board.js";
import ComputerFooter from "./ComputerFooter.js";

import { SoundContext } from "./../App.js";

import { useGame } from "./../Game/useGame.js";

function ComputerPlay({ player, opponent, unmountComputer }) {
  // Sound
  const { setSoundToPlay } = useContext(SoundContext);

  // first player
  const [toPlayFirst, setToPlayFirst] = useState(null);

  // the game custom hook
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    startGame,
    placePiece,
    setForfeiter,
  } = useGame(toPlayFirst, setSoundToPlay);

  function makeMove(col) {
    placePiece(col, 0);
  }

  function forfeit(player) {
    setForfeiter(0);
  }

  function startNewGame(player) {
    setToPlayFirst(player);
    resetGame();
    startGame();
  }

  return (
    <>
      <ComputerHeader unmountLocal={unmountComputer} />
      <Board
        viewer={0}
        board={board}
        isViewersTurn={toPlayNext === 0}
        colours={[player.colour, opponent.colour]}
        makeMove={makeMove}
      />
      <ComputerFooter
        gameStatus={gameStatus}
        winner={winner}
        forfeit={forfeit}
        startNewGame={startNewGame}
      />
    </>
  );
}

export default ComputerPlay;
