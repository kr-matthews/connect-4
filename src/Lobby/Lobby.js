import CreateRoom from "./CreateRoom.js";
import JoinRoom from "./JoinRoom.js";

import { useLobby } from "./useLobby.js";

// TODO: UI: improve design/css of lobby (and sub-components)

// TODO: LATER: MULTIPLAYER: add local 2-player as an option in Lobby
// TODO: LATER: COMPUTER: add computer opponent as an option in Lobby

function Lobby({ setRoomCode, setIsOwner, setRestartMethod, pubnub }) {
  //// pubnub setup

  // TODO: review use of promises/async
  async function getRoomOccupancy(roomCode) {
    const room = await pubnub.hereNow({ channels: [roomCode] });
    return room.totalOccupancy;
  }

  function prepareRoom(roomCode) {
    console.log("Preparing room."); // TEMP:
    pubnub.subscribe({
      channels: [roomCode],
      withPresence: true,
    });
  }

  //// useLobby hook, agnostic to chosen network

  const { createRoom, joinRoom } = useLobby(
    setRoomCode,
    setIsOwner,
    setRestartMethod,
    getRoomOccupancy,
    prepareRoom
  );

  //// Return

  return (
    <>
      <h2>Lobby</h2>
      <p>
        Welcome to the Connect 4 lobby. Here, you can create or join a room.
        Rooms are where you can play a game of Connect 4, and can fit up to 2
        players.
      </p>

      <CreateRoom createRoom={createRoom} />
      <JoinRoom joinRoom={joinRoom} />
    </>
  );
}

export default Lobby;
