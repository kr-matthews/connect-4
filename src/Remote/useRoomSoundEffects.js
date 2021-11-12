import { useEffect, useContext } from "react";

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

  //// Effects

  // NOTE: TODO: unfortunately, the order of these useEffects matters
  // the join/leave sounds will be overriden by create/join/leave/close sounds

  // for owner when 2nd player joins or leaves -- but not on initial render
  useEffect(() => {
    if (isOwner) {
      setSoundToPlay(hasOpponent ? playerJoinSound : playerLeaveSound);
    }
    // only hasOpponent changes
  }, [setSoundToPlay, isOwner, hasOpponent]);

  // on mount and unmount
  useEffect(() => {
    setSoundToPlay(isOwner ? createRoomSound : joinRoomSound);
    return function cleanup() {
      setSoundToPlay(isOwner ? closeRoomSound : leaveRoomSound);
    };
    // none will change while Room is mounted
  }, [setSoundToPlay, isOwner]);

  //// Return functions

  function playKickSound() {
    setSoundToPlay(kickOpponentSound);
  }

  //// Return

  return { playKickSound };
}

export { useRoomSoundEffects };
