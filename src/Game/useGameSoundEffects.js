import { useEffect, useContext } from "react";

import yourTurnSound from "./../sounds/water_dropwav-6707.mp3";
import winSound from "./../sounds/good-6081.mp3";
import loseSound from "./../sounds/failure-drum-sound-effect-2mp3-7184.mp3";
import drawSound from "./../sounds/mixkit-retro-game-notification-212.wav";

import { SoundContext } from "./../App.js";

function useGameSoundEffects({ gameStatus, toPlayNext, winner }) {
  //// Sound

  const { setSoundToPlay } = useContext(SoundContext);

  //// Effects

  // trigger win/lose sound effect
  useEffect(() => {
    if (winner === 0) {
      setSoundToPlay(winSound);
    } else if (winner === 1) {
      setSoundToPlay(loseSound);
    }
  }, [winner, setSoundToPlay]);

  // trigger draw sound effect
  useEffect(() => {
    if (gameStatus === "draw") {
      setSoundToPlay(drawSound);
    }
  }, [gameStatus, setSoundToPlay]);

  // trigger your turn sound effect
  useEffect(() => {
    if (toPlayNext === 0) {
      setSoundToPlay(yourTurnSound);
    }
  }, [toPlayNext, setSoundToPlay]);
}

export { useGameSoundEffects };
