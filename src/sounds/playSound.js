function playSound(url, soundIsOn = false) {
  if (soundIsOn) {
    console.log(url); // TEMP:
    new Audio(url).play();
  }
}

export { playSound };

// TODO: NEXT: don't play sounds when muted (via a Context?)
