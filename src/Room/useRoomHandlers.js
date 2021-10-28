import { useState } from "react";

import createRoomSound from "./../sounds/success-1-6297.mp3";
import closeRoomSound from "./../sounds/power-down-7103.mp3";
import joinRoomSound from "./../sounds/good-6081.mp3";
import leaveRoomSound from "./../sounds/notification-sound-7062.mp3";

// helpers

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
  // TODO: NETWORK: check network for this room code
  return roomCode === "KNKT"; // TEMP: always say room code doesn't exist
}

function useRoomHandlers(setSoundToPlay) {
  //// States

  const [roomCode, setRoomCode] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [restartMethod, setRestartMethod] = useState("alternate");

  //// Externally accessible handlers

  // TODO: NETWORK: many of these handlers need to send out messages

  function createRoomHandler(restartMethodInput) {
    // randomly generate room code (make sure it doesn't already exist)
    // take in restartMethod and pass to Room
    setRoomCode(generateUnusedRoomCode());
    setIsOwner(true);
    setRestartMethod(restartMethodInput);
    setSoundToPlay(createRoomSound);
  }

  function joinRoomHandler(roomCodeInput) {
    if (isRoomCodeInUse(roomCodeInput)) {
      setRoomCode(roomCodeInput);
      setIsOwner(false);
      setSoundToPlay(joinRoomSound);
    } else {
      alert("No room with code " + roomCodeInput + " currently exists.");
    }
  }

  function closeRoomHandler() {
    setRoomCode(null);
    setIsOwner(null);
    setSoundToPlay(closeRoomSound);
  }

  function leaveRoomHandler() {
    setRoomCode(null);
    setIsOwner(null);
    setRestartMethod("alternate");
    setSoundToPlay(leaveRoomSound);
  }

  //// Return

  return {
    roomCode,
    isOwner,
    restartMethod,
    createRoomHandler,
    joinRoomHandler,
    closeRoomHandler,
    leaveRoomHandler,
  };
}

export { useRoomHandlers };
