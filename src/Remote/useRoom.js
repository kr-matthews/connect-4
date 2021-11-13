import { useGame } from "./../Game/useGame.js";
import { useGameSoundEffects } from "./../Game/useGameSoundEffects.js";
import { useRoomSoundEffects } from "./useRoomSoundEffects.js";
import { useSendMessages } from "./useSendMessages.js";
import { useReceiveMessages } from "./useReceiveMessages.js";
import { useResults } from "./../Game/useResults.js";

// TODO: TEST: useRoom: create tests for this hook (and all sub-hooks)

function useRoom(
  network,
  roomCode,
  player,
  isOwner,
  opponent,
  setOpponent,
  restartMethod,
  setRestartMethod,
  unmountRoom
) {
  // is an opponent present?
  const hasOpponent = opponent !== null;

  //// custom hooks

  // game (& board)
  const {
    board,
    gameStatus,
    prevMove,
    toPlayFirst,
    toPlayNext,
    winner,
    resetGame,
    startGame,
    placePiece,
    setForfeiter,
  } = useGame();

  // game sound effects
  useGameSoundEffects(false, gameStatus, toPlayNext, winner);

  // room sound effects (PROBLEM: can't detect kick)
  const { playKickSound } = useRoomSoundEffects(isOwner, hasOpponent);

  // network

  // send messages
  useSendMessages(
    network,
    roomCode,
    player,
    isOwner,
    hasOpponent,
    gameStatus,
    prevMove,
    toPlayFirst,
    winner,
    restartMethod
  );

  // receive messages
  useReceiveMessages(
    network,
    roomCode,
    player.uuid,
    hasOpponent,
    setOpponent,
    resetRoom,
    startGame,
    placePiece,
    setForfeiter,
    setRestartMethod,
    unmountRoom
  );

  // W-D-L history of games played
  const { resultHistory } = useResults(gameStatus, winner, hasOpponent);

  //// Helper functions

  // will only be called by owner
  function resetRoom() {
    setOpponent(null);
    resetGame();
  }

  //// Externally available functions, for this player's actions

  function startNewGame() {
    startGame(restartMethod);
  }

  function makeMove(col) {
    // only act if it's your turn
    if (toPlayNext === 0) {
      placePiece(col, 0);
    }
  }

  // TODO: MAYBE: PERMAKICK: add via uuid-check (not perfect) ??
  // TODO: MAYBE: use permakick list to play kick sound ??

  function kickOpponent() {
    resetRoom();
    playKickSound();
  }

  //// Return

  return {
    resultHistory,
    board,
    gameStatus,
    winner,
    toPlayNext,
    startNewGame,
    makeMove,
    forfeit: setForfeiter,
    kickOpponent,
  };
}

export { useRoom };
