import { useEffect, useRef, useContext } from "react";

import createRoomSound from "./../sounds/success-1-6297.mp3";
import joinRoomSound from "./../sounds/good-6081.mp3";
import playerJoinSound from "./../sounds/chime-sound-7143.mp3";
import playerLeaveSound from "./../sounds/notification-sound-7062.mp3";
import kickOpponentSound from "./../sounds/fist-punch-or-kick-7171.mp3";
import closeRoomSound from "./../sounds/power-down-7103.mp3";
import leaveRoomSound from "./../sounds/notification-sound-7062.mp3";

import { SoundContext } from "./../App.js";

function useRoomSoundEffects(isOwner, hasOpponent) {
  //// Sound

  const { setSoundToPlay } = useContext(SoundContext);

  //// Helper state to prevent some sounds on initial render
  const isInitialRender = useRef(true);

  //// Effects

  // NOTE: the order is important because later sounds override earlier sounds
  //  that's probably a bad thing; should redo it properly

  // play sounds on mount and unmount
  useEffect(() => {
    setSoundToPlay(isOwner ? createRoomSound : joinRoomSound);
    return function cleanup() {
      setSoundToPlay(isOwner ? closeRoomSound : leaveRoomSound);
    };
    // none will change while Room is mounted
  }, [setSoundToPlay, isOwner]);

  // play sounds for owner when 2nd player joins or leaves
  useEffect(() => {
    if (isOwner && !isInitialRender.current) {
      setSoundToPlay(hasOpponent ? playerJoinSound : playerLeaveSound);
    }
    isInitialRender.current = true;
    // only hasOpponent changes
  }, [setSoundToPlay, isInitialRender, isOwner, hasOpponent]);

  useEffect(() => {
    isInitialRender.current = false;
  });
}

export { useRoomSoundEffects };
