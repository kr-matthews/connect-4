import LocalHeader from "./LocalHeader.js";
import Board from "./../Game/Board.js";
import DoubleFooter from "./../Game/DoubleFooter.js";

import { useGame } from "./../Game/useGame.js";
import { useResults } from "./../Game/useResults.js";

function LocalPlay({ player, opponent, unmountLocal }) {
  // the game custom hook (no sound used)
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    startGame,
    placePiece,
    setForfeiter,
  } = useGame();

  // keep track of result history
  const { resultHistory } = useResults(gameStatus, winner);

  // functions to pass to sub-components

  function makeMove(col) {
    placePiece(col, toPlayNext);
  }

  return (
    <>
      <LocalHeader
        resultHistory={resultHistory}
        names={[player.name, opponent.name]}
        unmountLocal={unmountLocal}
      />
      <Board
        viewer={toPlayNext}
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
        forfeit={setForfeiter}
        startNewGame={startGame}
      />
    </>
  );
}

export default LocalPlay;
