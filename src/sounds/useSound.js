import { useState, useEffect } from "react";

function playSound(url) {
  new Audio(url).play();
}

function useSound(soundIsOn) {
  const [soundToPlay, setSoundToPlay] = useState(null);

  // play triggered sound
  useEffect(() => {
    if (soundToPlay && soundIsOn) {
      playSound(soundToPlay);
    }
    setSoundToPlay(null);
  }, [soundToPlay, soundIsOn]);

  return { setSoundToPlay };
}

export { useSound };
