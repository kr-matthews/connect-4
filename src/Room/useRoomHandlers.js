import { useState, useEffect, useCallback } from "react";

import createRoomSound from "./../sounds/success-1-6297.mp3";
import closeRoomSound from "./../sounds/power-down-7103.mp3";
import joinRoomSound from "./../sounds/good-6081.mp3";
import leaveRoomSound from "./../sounds/notification-sound-7062.mp3";

function useRoomHandlers(setSoundToPlay, pubnub, player) {
  //// States

  const [roomCode, setRoomCode] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [restartMethod, setRestartMethod] = useState("alternate");

  //// in-coming network

  // handle owner closing and kicking
  const removedHandler = useCallback(
    (message) => {
      setRoomCode(null);
      pubnub.unsubscribe({ channels: [roomCode] });
    },
    [pubnub, roomCode]
  );

  // hold most recent message about being removed from room (close or kick)
  const [removedMessage, setRemovedMessage] = useState(null);
  // check for messages about being removed from room
  useEffect(() => {
    console.log("PubNub updated."); // TEMP:
    function messageHandler(event) {
      switch (event.message.type) {
        case "close":
        case "kick":
          console.log("Received opponent information.");
          setRemovedMessage(event.message);
          break;
        default:
          break;
      }
    }
    pubnub.addListener({ message: messageHandler });
  }, [pubnub]);
  // handle most recent message about being removed from room
  useEffect(() => {
    if (removedMessage && removedMessage.uuid !== player.uuid) {
      removedHandler();
    }
    setRemovedMessage(null);
  }, [removedMessage, removedHandler, player.uuid]);

  //// rooms and room codes

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
    pubnub.hereNow({ channels: [roomCode] }).then((response) => {
      return response.totalOccupancy > 0;
    });
  }

  //// Externally accessible handlers

  function createRoomHandler(restartMethodInput) {
    // randomly generate room code (make sure it doesn't already exist)
    // take in restartMethod and pass to Room
    const generatedRoomCode = generateUnusedRoomCode();
    console.log("Subscribing to " + generatedRoomCode); // TEMP:
    pubnub.subscribe({
      channels: [generatedRoomCode],
      withPresence: true,
    });
    setRoomCode(generatedRoomCode);
    setIsOwner(true);
    setRestartMethod(restartMethodInput);
    setSoundToPlay(createRoomSound);
  }

  function joinRoomHandler(roomCodeInput) {
    // TODO: NEXT: error on submitting "" (deal with elsewhere)
    pubnub
      .hereNow({ channels: [roomCodeInput] })
      .then((response) => {
        if (response.totalOccupancy === 0) {
          alert("No room with code " + roomCodeInput + " currently exists.");
        } else if (response.totalOccupancy === 1) {
          // subscribe to room's channel
          console.log("Subscribing to " + roomCodeInput); // TEMP:
          pubnub.subscribe({
            channels: [roomCodeInput],
            withPresence: true,
          });
          // update own states
          setRoomCode(roomCodeInput);
          setIsOwner(false);
          setSoundToPlay(joinRoomSound);
          // send details to opponent
          pubnub.publish({
            message: { ...player, type: "join" },
            channel: roomCodeInput,
          });
        } else {
          alert(
            "The room with code " + roomCodeInput + " already has two players."
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeRoomHandler() {
    // send message
    console.log("Sending close"); // TEMP:
    pubnub.publish({
      message: { type: "close", uuid: player.uuid },
      channel: roomCode,
    });
    // ubsubscribe from pubnub channel
    console.log("Unsubscribing from " + roomCode); // TEMP:
    pubnub.unsubscribe({ channels: [roomCode] });
    // update own states
    setRoomCode(null);
    setIsOwner(null);
    setSoundToPlay(closeRoomSound);
  }

  function leaveRoomHandler() {
    // send message
    console.log("Sending leave"); // TEMP:
    pubnub.publish({
      message: { type: "leave", uuid: player.uuid },
      channel: roomCode,
    });
    // ubsubscribe from pubnub channel
    console.log("Unsubscribing from " + roomCode); // TEMP:
    pubnub.unsubscribe({ channels: [roomCode] });
    // update own states
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
