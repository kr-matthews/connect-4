import { useEffect, useCallback } from "react";

function useSendMessages(
  network,
  roomCode,
  player,
  isOwner,
  hasOpponent,
  gameStatus,
  prevMove,
  toPlayFirst,
  winner,
  restartMethod
) {
  //// sending/publishing setup

  // may need modifying if a new network replaces pubnub
  const publishMessage = useCallback(
    async (message) => {
      try {
        await network.publish({
          message: { ...message, uuid: player.uuid },
          channel: roomCode,
        });
      } catch (error) {
        console.error("Couldn't publish message.", error);
        alert(
          "Could not send '" +
            message.type +
            "' message to opponent.\nYou may be out of sync with your opponent.\nConsider closing the room and creating a new one, if you haven't already."
        );
      }
    },
    // none will change until Room unmounts
    [network, roomCode, player.uuid]
  );

  //// Room info

  // send name/colour on own join, on opponent join, and when changed
  useEffect(() => {
    if (hasOpponent || !isOwner) {
      publishMessage({
        type: "playerInfo",
        name: player.name,
        colour: player.colour,
      });
    }
    // only hasOpponent and player will change
  }, [publishMessage, isOwner, hasOpponent, player.name, player.colour]);

  // send restartMethod when opponent joins your room
  useEffect(() => {
    if (isOwner && hasOpponent) {
      publishMessage({ type: "restartMethod", restartMethod });
    }
    // only hasOpponent will change when isOwner
  }, [publishMessage, isOwner, hasOpponent, restartMethod]);

  //// Gameplay

  // send toPlayFirst when you start a new game
  useEffect(() => {
    if (isOwner && gameStatus === "ongoing") {
      publishMessage({ type: "start", toPlayFirst });
    }
    // others won't change while gameStatus is ongoing
  }, [publishMessage, isOwner, gameStatus, toPlayFirst]);

  // send move when you make one
  useEffect(() => {
    if (prevMove && prevMove.player === 0) {
      publishMessage({ type: "move", col: prevMove.col });
    }
    // only prevMove changes
  }, [publishMessage, prevMove]);

  // send forfeit message when you forfeit
  useEffect(() => {
    if (gameStatus === "forfeit" && winner === 1) {
      publishMessage({ type: "forfeit" });
    }
    // others won't change while gameStatus is forfeit
  }, [publishMessage, gameStatus, winner]);

  //// Cleanup

  // send kick when opponent becomes null
  // (if they weren't kicked they'll be gone already so nobody gets the message)
  useEffect(() => {
    if (isOwner && !hasOpponent) {
      publishMessage({ type: "kick" });
    }
    // only hasOpponent changes
  }, [publishMessage, isOwner, hasOpponent]);

  // send close or leave on unmount of Room
  // PROBLEM: won't run if browser window/tab is closed
  useEffect(() => {
    return function cleanup() {
      publishMessage({ type: isOwner ? "close" : "leave" });
    };
    // none of these will change while Room is mounted
  }, [isOwner, publishMessage]);
}

export { useSendMessages };
