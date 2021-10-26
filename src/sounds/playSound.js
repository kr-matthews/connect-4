function playSound(url, soundIsOn = false) {
  if (soundIsOn) {
    console.log(url); // TEMP: print sound url
    new Audio(url).play();
  }
}

export { playSound };
