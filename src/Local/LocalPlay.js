import { useState, useContext } from "react";

import LocalHeader from "./LocalHeader.js";
import Board from "./../Game/Board.js";
import DoubleFooter from "./../Game/DoubleFooter.js";

import { SoundContext } from "./../App.js";

import { useGame } from "./../Game/useGame.js";

function LocalPlay({ player, opponent, unmountLocal }) {
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
    placePiece(col, toPlayNext);
  }

  function forfeit(player) {
    setForfeiter(player);
  }

  function startNewGame(player) {
    setToPlayFirst(player);
    resetGame();
    startGame();
  }

  return (
    <>
      <LocalHeader unmountLocal={unmountLocal} />
      <Board
        viewer={toPlayNext || toPlayFirst}
        board={board}
        isViewersTurn={toPlayNext !== null}
        colours={[player.colour, opponent.colour]}
        makeMove={makeMove}
      />
      <DoubleFooter
        names={[player.name, opponent.name]}
        gameStatus={gameStatus}
        winner={winner}
        toPlayNext={toPlayNext}
        forfeit={forfeit}
        startNewGame={startNewGame}
      />
    </>
  );
}

export default LocalPlay;
