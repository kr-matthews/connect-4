function playSound(url) {
  console.log(url); // TEMP:
  new Audio(url).play();
}

export { playSound };
