import LocalHeader from "./LocalHeader.js";
import Board from "./../Game/Board.js";
import GameFooter from "./../Game/GameFooter.js";

import { useGame } from "./../Game/useGame.js";
import { useGameSoundEffects } from "./../Game/useGameSoundEffects.js";
import { useResults } from "./../Game/useResults.js";
import { useComputerPlayer } from "./../Computer/useComputerPlayer.js";

function LocalPlay({ sharingScreen, player, opponent, unmount }) {
  // the game custom hook
  const {
    gameStatus,
    toPlayNext,
    winner,
    startGame,
    placePiece,
    setForfeiter,
    keyAttributes,
    boardStats,
  } = useGame();
  const { positions, columns } = boardStats;

  useGameSoundEffects(sharingScreen, gameStatus, toPlayNext, winner);

  // keep track of result history
  const { resultHistory } = useResults(gameStatus, winner);

  // computer player, when applicable
  useComputerPlayer(
    opponent.type === "computer",
    1,
    toPlayNext === 1,
    (col) => placePiece(col, 1),
    () => setForfeiter(1),
    keyAttributes,
    boardStats
  );

  // functions for sub-components

  function makeMove(col) {
    placePiece(col, sharingScreen ? toPlayNext : 0);
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
        positions={positions}
        columns={columns}
        isViewersTurn={sharingScreen ? toPlayNext !== null : toPlayNext === 0}
        colours={[player.colour, opponent.colour]}
        makeMove={makeMove}
      />
      <GameFooter
        sharingScreen={sharingScreen}
        viewer={sharingScreen ? toPlayNext : 0}
        isOwner={true}
        names={[sharingScreen ? player.name : "You", opponent.name]}
        gameStatus={gameStatus}
        winner={winner}
        toPlayNext={toPlayNext}
        forfeit={setForfeiter}
        startNewGame={startGame}
        hasRestartChoice={true}
      />
    </>
  );
}

export default LocalPlay;
