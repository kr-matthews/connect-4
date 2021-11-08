import { getRandomColour } from "./../Colours.js";

function useLobby(
  setOpponent,
  setPlayType,
  setRoomCode,
  setIsOwner,
  setRestartMethod,
  getRoomOccupancy
) {
  //// Helpers

  async function generateUnusedRoomCode() {
    // omit 0/O, 1/I/L just in case
    const chars = "ABCDEFGHJKMNPQRSTUVXYZ23456789";

    // loop: generate 4-digit code, check whether it is in use, if not then use
    let roomCode = "";
    let occupancy = -1;
    do {
      roomCode = "";
      for (let i = 0; i < 4; i++) {
        roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      occupancy = await getRoomOccupancy(roomCode);
    } while (occupancy > 0);

    if (occupancy === -1) {
      // couldn't connect to network
      return null;
    }

    // otherwise occupancy is 0
    return roomCode;
  }

  //// Externally accessible handlers

  async function createRoom(restartMethod) {
    // randomly generate room code (make sure it doesn't already exist)
    const generatedRoomCode = await generateUnusedRoomCode();
    if (generatedRoomCode) {
      // set parameters for room
      setIsOwner(true);
      setRestartMethod(restartMethod);
      setRoomCode(generatedRoomCode);
      setPlayType("online");
    } else {
      alert("Could not create room.");
    }
  }

  async function joinRoom(roomCode) {
    const roomOccupancy = await getRoomOccupancy(roomCode);
    if (roomOccupancy === 0) {
      alert("No room with code " + roomCode + " currently exists.");
    } else if (roomOccupancy === 1) {
      // set parameters for room -- will receive restartMethod via message later
      setIsOwner(false);
      setRestartMethod(null);
      setRoomCode(roomCode);
      setPlayType("online");
    } else if (roomOccupancy === 2) {
      alert("The room with code " + roomCode + " already has two players.");
    } else {
      alert("Could not join Room.");
    }
  }

  function playLocally() {
    // setup opponent (is null til now)
    setOpponent({ name: "Player II", colour: getRandomColour() });
    // mount component
    setPlayType("local");
  }

  function playComputer() {
    // setup opponent (is null til now)
    setOpponent({ name: "Computron 40 5000", colour: getRandomColour() });
    // mount component
    setPlayType("computer");
  }

  //// Return

  return {
    createRoom,
    joinRoom,
    playLocally,
    playComputer,
  };
}

export { useLobby };
