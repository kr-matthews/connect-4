function useLobby(setRoomCode, setIsOwner, setRestartMethod, getRoomOccupancy) {
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
    } else {
      alert("The room with code " + roomCode + " already has two players.");
    }
  }

  //// Return

  return {
    createRoom,
    joinRoom,
  };
}

export { useLobby };
