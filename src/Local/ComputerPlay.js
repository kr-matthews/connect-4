import ComputerHeader from "./ComputerHeader.js";
import Board from "./../Game/Board.js";
import SingleFooter from "./../Game/SingleFooter.js";

import { useGame } from "./../Game/useGame.js";
import { useGameSoundEffects } from "./../Game/useGameSoundEffects.js";
import { useResults } from "./../Game/useResults.js";

// TODO: REUSE: this is extremely similar to ./LocalPlay.js

function ComputerPlay({ player, opponent, unmountComputer }) {
  // the game custom hook
  const {
    board,
    gameStatus,
    toPlayNext,
    winner,
    startGame,
    placePiece,
    setForfeiter,
  } = useGame();

  useGameSoundEffects(false, gameStatus, toPlayNext, winner);

  // keep track of result history
  const { resultHistory } = useResults(gameStatus, winner);

  // functions for sub-components

  function makeMove(col) {
    placePiece(col, 0);
  }

  function forfeit(player) {
    setForfeiter(0);
  }

  return (
    <>
      <ComputerHeader
        resultHistory={resultHistory}
        unmountComputer={unmountComputer}
      />
      <Board
        viewer={0}
        board={board}
        isViewersTurn={toPlayNext === 0}
        colours={[player.colour, opponent.colour]}
        makeMove={makeMove}
      />
      TEMP: computer player doesn't exist yet
      <SingleFooter
        viewer={0}
        isOwner={true}
        gameStatus={gameStatus}
        winner={winner}
        toPlayNext={toPlayNext}
        forfeit={forfeit}
        startNewGame={startGame}
        hasChoice={true}
      />
    </>
  );
}

export default ComputerPlay;
