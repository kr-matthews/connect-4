function Footer({
  viewer,
  toPlayNext,
  gameStatus,
  resetGame,
  restartMethod,
  wentFirst,
  setWentFirst,
  dispatchResult,
}) {
  // TODO: redo given forfeit info and new gameStatus definition
  //  (right now it just says you win with no highlights, is confusing)
  function message() {
    switch (gameStatus) {
      case viewer:
        return "Congratulations, you won!";
      case 1 - viewer:
        return "You lost.";
      case "draw":
        return "It's a draw.";
      case "ongoing":
        return viewer === toPlayNext
          ? "It's your turn to drop a piece."
          : "Waiting for your opponent to move.";
      default:
        return "Something has gone wrong. Apologies.";
    }
  }

  function restartHandler(gameStatus) {
    switch (restartMethod) {
      case "random":
        const player = Math.floor(Math.random() * 2);
        resetGame(player);
        setWentFirst(player);
        break;
      case "alternate":
        resetGame(1 - wentFirst);
        setWentFirst(1 - wentFirst);
        break;
      case "loser":
        if (gameStatus === "draw") {
          // if it's a draw, keep the same player
          resetGame(wentFirst);
        } else {
          resetGame(1 - gameStatus);
          setWentFirst(1 - gameStatus);
        }
        break;
      case "winner":
        if (gameStatus === "draw") {
          // if it's a draw, keep the same player
          resetGame(wentFirst);
        } else {
          resetGame(gameStatus);
        }
        break;
      default:
        console.log("New Game click handler didn't match any case.");
        resetGame(0);
    }
  }

  function forfeitHandler() {
    // TODO: update W-D-L record on forfeit
    restartHandler(1); // call with gameStatus being 1 (opponent win)
  }

  // TODO: improve Footer design/css
  return (
    <>
      <p>{message()}</p>
      {gameStatus === "ongoing" ? (
        <button onClick={forfeitHandler}>Forfeit</button>
      ) : (
        <button onClick={restartHandler}>New Game</button>
      )}
    </>
  );
}

export default Footer;
