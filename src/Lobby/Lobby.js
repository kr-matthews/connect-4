import CreateRoom from "./CreateRoom.js";
import JoinRoom from "./JoinRoom.js";

import CreateMultiPlayer from "./CreateMultiPlayer.js";
import CreateSinglePlayer from "./CreateSinglePlayer.js";

import { useLobby } from "./useLobby.js";

// TODO: UI: improve design/css of lobby (and sub-components)

function Lobby({
  setOpponent,
  setPlayType,
  setRoomCode,
  setIsOwner,
  setRestartMethod,
  pubnub,
}) {
  //// pubnub setup

  // TODO: NEXT: ASYNC: review use of promises/async
  async function getRoomOccupancy(roomCode) {
    const room = await pubnub.hereNow({ channels: [roomCode] });
    return room.totalOccupancy;
  }

  //// useLobby hook, agnostic to chosen network

  const { createRoom, joinRoom, playLocally, playComputer } = useLobby(
    setOpponent,
    setPlayType,
    setRoomCode,
    setIsOwner,
    setRestartMethod,
    getRoomOccupancy
  );

  //// Return

  return (
    <>
      <h2>Lobby</h2>
      <p>
        Welcome to the Connect 4 lobby. Here, you can play a friend remotely by
        creating or joining a room, or you can play locally against a friend or
        the computer. Rooms can fit up to 2 players.
      </p>

      <CreateRoom createRoom={createRoom} />
      <JoinRoom joinRoom={joinRoom} />
      <CreateMultiPlayer playLocally={playLocally} />
      <CreateSinglePlayer playComputer={playComputer} />
    </>
  );
}

export default Lobby;
