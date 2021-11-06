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

  function generateUnusedRoomCode() {
    // omit 0/O, 1/I/L just in case
    const chars = "ABCDEFGHJKMNPQRSTUVXYZ23456789";

    // loop: generate 4-digit code, check whether it is in use, if not then use
    let roomCode = "";
    do {
      roomCode = "";
      for (let i = 0; i < 4; i++) {
        roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (isRoomCodeInUse(roomCode));

    return roomCode;
  }

  function isRoomCodeInUse(roomCode) {
    return getRoomOccupancy(roomCode) > 0;
  }

  //// Externally accessible handlers

  function createRoom(restartMethod) {
    // randomly generate room code (make sure it doesn't already exist)
    const generatedRoomCode = generateUnusedRoomCode();
    // set parameters for room
    setIsOwner(true);
    setRestartMethod(restartMethod);
    setRoomCode(generatedRoomCode);
    setPlayType("online");
  }

  // TODO: NEXT: ASYNC: review use of promises/async

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
    } else {
      alert("The room with code " + roomCode + " already has two players.");
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
    setOpponent({ name: "Computron 5000", colour: getRandomColour() });
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
