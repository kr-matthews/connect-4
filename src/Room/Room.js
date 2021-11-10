import { useEffect, useContext } from "react";

import RoomHeader from "./RoomHeader.js";
import Board from "./../Game/Board.js";
import SingleFooter from "./../Game/SingleFooter.js";

import { SoundContext } from "./../App.js";

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
  pubnub,
}) {
  //// sounds

  const { setSoundToPlay } = useContext(SoundContext);

  //// useRoom hook

  const {
    resultHistory,
    board,
    gameStatus,
    winner,
    toPlayNext,
    startNewGame,
    makeMove,
    forfeit,
    kickOpponent,
    queueIncomingMessage,
  } = useRoom(
    pubnub,
    roomCode,
    player,
    isOwner,
    opponent,
    setOpponent,
    restartMethod,
    setRestartMethod,
    setSoundToPlay,
    unmountRoom
  );

  //// in-coming network (via pubnub)

  // PROBLEM: TODO: NEXT: Room doesn't always seem to unsubscribe
  // "no-ops" on unmounted components sometimes happen
  // and rooms sometimes think 2 people are present after player 2 leaves

  // (un)subscribe to/from Room's channel
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    // would call subscribe directly, but can't do so for async functions
    async function subscribe() {
      try {
        await pubnub.subscribe({
          channels: [roomCode],
          withPresence: true,
        });
      } catch (error) {
        console.error("Couldn't subscribe.", error);
        alert("Could not listen for messages from opponent. Closing room.");
        unmountRoom();
      }
    }

    subscribe();
    // QUESTION: shouldn't this only be returned if subscription was successful?
    return function unsubscribe() {
      try {
        pubnub.unsubscribe({ channels: [roomCode] });
      } catch (error) {
        console.error("Couldn't unsubscribe.", error);
      }
    };
    // none will change while Room is mounted
  }, [pubnub, roomCode, unmountRoom]);

  // setup listener for messages
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    function handleMessage(event) {
      queueIncomingMessage(event.message);
    }
    const listener = { message: handleMessage };
    async function listen() {
      try {
        await pubnub.addListener(listener);
        return function cleanupListener() {
          pubnub.removeListener(listener);
        };
      } catch (error) {
        console.error("Couldn't add listener.", error);
        alert("Could not listen for messages from opponent. Closing room.");
        unmountRoom();
      }
    }

    return listen();
    // note that none of these ever change
  }, [pubnub, queueIncomingMessage, unmountRoom]);

  //// Return

  return (
    <>
      <RoomHeader
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
          board={board}
          isViewersTurn={0 === toPlayNext}
          colours={[player.colour, opponent.colour]}
          makeMove={makeMove}
        />
      )}
      {opponent && (
        <SingleFooter
          viewer={0}
          isOwner={isOwner}
          gameStatus={gameStatus}
          winner={winner}
          toPlayNext={toPlayNext}
          forfeit={forfeit}
          startNewGame={startNewGame}
          hasChoice={false}
        />
      )}
    </>
  );
}

export default Room;
