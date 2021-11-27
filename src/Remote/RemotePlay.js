import RemoteHeader from "./RemoteHeader.js";
import Board from "./../Game/Board.js";
import GameFooter from "./../Game/GameFooter.js";

import { useRoom } from "./useRoom.js";

// the room is seen from the current player's view
//  each player has their own instantiation of the 'shared' room

function Room({
  roomCode,
  player,
  isOwner,
  opponent,
  setOpponent,
  restartMethod,
  setRestartMethod,
  unmountRoom,
  network,
}) {
  //// useRoom hook

  const {
    resultHistory,
    boardStats,
    gameStatus,
    winner,
    toPlayNext,
    startNewGame,
    makeMove,
    forfeit,
    kickOpponent,
  } = useRoom(
    network,
    roomCode,
    player,
    isOwner,
    opponent,
    setOpponent,
    restartMethod,
    setRestartMethod,
    unmountRoom
  );
  const { positions, columns } = boardStats;

  //// Return

  return (
    <>
      <RemoteHeader
        roomCode={roomCode}
        isOwner={isOwner}
        hasOpponent={opponent !== null}
        restartMethod={restartMethod}
        resultHistory={resultHistory}
        kickOpponent={kickOpponent}
        closeRoom={unmountRoom}
        leaveRoom={unmountRoom}
      />
      {opponent && (
        <Board
          viewer={0}
          positions={positions}
          columns={columns}
          isViewersTurn={0 === toPlayNext}
          colours={[player.colour, opponent.colour]}
          makeMove={makeMove}
        />
      )}
      {opponent && (
        <GameFooter
          sharingScreen={false}
          viewer={0}
          isOwner={isOwner}
          names={[player.name, opponent.name]}
          gameStatus={gameStatus}
          winner={winner}
          toPlayNext={toPlayNext}
          forfeit={forfeit}
          startNewGame={startNewGame}
          hasRestartChoice={false}
        />
      )}
    </>
  );
}

export default Room;
