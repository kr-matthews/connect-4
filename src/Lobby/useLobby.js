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
    try {
      do {
        roomCode = "";
        for (let i = 0; i < 4; i++) {
          roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        occupancy = await getRoomOccupancy(roomCode);
      } while (occupancy > 0);

      return roomCode;
    } catch (error) {
      console.error("Couldn't generate room code.", error);
      throw error;
    }
  }

  //// Externally accessible handlers

  async function createRoom(restartMethod) {
    try {
      // randomly generate room code (make sure it doesn't already exist)
      const generatedRoomCode = await generateUnusedRoomCode();
      // set parameters for room
      setIsOwner(true);
      setRestartMethod(restartMethod);
      setRoomCode(generatedRoomCode);
      setPlayType("online");
    } catch (error) {
      console.error("Couldn't create room.", error);
    }
  }

  async function joinRoom(roomCode) {
    try {
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
    } catch (error) {
      console.error("Couldn't join room.", error);
    }
  }

  function playLocally() {
    // setup opponent (is null til now)
    setOpponent({
      name: "Player II",
      colour: getRandomColour(),
      type: "local",
    });
    // mount component
    setPlayType("local");
  }

  function playComputer() {
    // setup opponent (is null til now)
    setOpponent({
      name: "Computron 40 5000",
      colour: getRandomColour(),
      type: "computer",
    });
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
