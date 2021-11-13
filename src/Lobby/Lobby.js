import CreateRoom from "./CreateRoom.js";
import JoinRoom from "./JoinRoom.js";

import CreateMultiPlayer from "./CreateMultiPlayer.js";
import CreateSinglePlayer from "./CreateSinglePlayer.js";

import { useLobby } from "./useLobby.js";

import "./lobby.css";

const checkOccupancyFailMessage =
  "Could not successfully check room occupancy.\nMay not be connected to the network.";

function Lobby({
  setOpponent,
  setPlayType,
  setRoomCode,
  setIsOwner,
  setRestartMethod,
  network,
}) {
  //// network setup

  async function getRoomOccupancy(roomCode) {
    try {
      const room = await network.hereNow({ channels: [roomCode] });
      return room.totalOccupancy;
    } catch (error) {
      alert(checkOccupancyFailMessage);
      console.error("Couldn't get room occupancy.", error);
      throw error;
    }
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
    <div className="lobby">
      <h2>Lobby</h2>
      <p>Welcome to the Connect 4 lobby.</p>

      <CreateRoom createRoom={createRoom} />
      <JoinRoom joinRoom={joinRoom} />
      <CreateMultiPlayer playLocally={playLocally} />
      <CreateSinglePlayer playComputer={playComputer} />
    </div>
  );
}

export default Lobby;
