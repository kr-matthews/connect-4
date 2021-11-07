import { useState } from "react";

import LocalHeader from "./LocalHeader.js";
import Board from "./../Game/Board.js";
import DoubleFooter from "./../Game/DoubleFooter.js";

import { useGame } from "./../Game/useGame.js";
import { useResults } from "./../Game/useResults.js";

function LocalPlay({ player, opponent, unmountLocal }) {
  // first player
  const [toPlayFirst, setToPlayFirst] = useState(null);

  // TODO: NEXT: SOUND: revisit -- doesn't work well for local play

  // the game custom hook (no sound used)
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    resetGame,
    startGame,
    placePiece,
    setForfeiter,
  } = useGame(toPlayFirst);

  // keep track of result history
  const { resultHistory } = useResults(gameStatus, winner);

  // functions to pass to sub-components

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
      <LocalHeader
        resultHistory={resultHistory}
        names={[player.name, opponent.name]}
        unmountLocal={unmountLocal}
      />
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
