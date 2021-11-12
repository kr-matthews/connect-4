import LocalHeader from "./LocalHeader.js";
import Board from "./../Game/Board.js";
import SingleFooter from "./../Game/SingleFooter.js";
import DoubleFooter from "./../Game/DoubleFooter.js";

import { useGame } from "./../Game/useGame.js";
import { useGameSoundEffects } from "./../Game/useGameSoundEffects.js";
import { useResults } from "./../Game/useResults.js";

function LocalPlay({ sharingScreen, player, opponent, unmount }) {
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

  useGameSoundEffects(sharingScreen, gameStatus, toPlayNext, winner);

  // keep track of result history
  const { resultHistory } = useResults(gameStatus, winner);

  // functions for sub-components

  function makeMove(col) {
    placePiece(col, sharingScreen ? toPlayNext : 0);
  }

  function forfeit(player) {
    setForfeiter(sharingScreen ? player : 0);
  }

  return (
    <>
      <LocalHeader
        sharingScreen={sharingScreen}
        names={[player.name, opponent.name]}
        resultHistory={resultHistory}
        unmount={unmount}
      />
      <Board
        viewer={sharingScreen ? toPlayNext : 0}
        board={board}
        isViewersTurn={sharingScreen ? toPlayNext !== null : toPlayNext === 0}
        colours={[player.colour, opponent.colour]}
        makeMove={makeMove}
      />
      {sharingScreen ? (
        <DoubleFooter
          names={[player.name, opponent.name]}
          gameStatus={gameStatus}
          winner={winner}
          toPlayNext={toPlayNext}
          forfeit={setForfeiter}
          startNewGame={startGame}
        />
      ) : (
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
      )}
    </>
  );
}

export default LocalPlay;
