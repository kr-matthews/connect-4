function SingleFooter({
  viewer,
  isOwner,
  gameStatus,
  winner,
  toPlayNext,
  forfeit,
  startNewGame,
  hasChoice,
}) {
  // to display to viewer
  function gameStatusMessage() {
    switch (gameStatus) {
      case "won":
        return winner === viewer ? "Congratulations, you won!" : "You lost.";
      case "forfeit":
        return winner === viewer
          ? "Your opponent has forfeit the game -- you win."
          : "You lost by forfeiting the game.";
      case "draw":
        return "It's a draw.";
      case "ongoing":
        return viewer === toPlayNext
          ? "It's your turn to drop a piece."
          : "Waiting for your opponent to play.";
      case "waiting":
        return "The game has not started yet.";
      default:
        console.log("Error: ", gameStatus);
        return "Something has gone wrong. Apologies.";
    }
  }

  // TODO: UI: improve Footer design/css

  //  displayed for viewer's point of view
  return (
    <>
      {/* explain what's going on with the game */}
      <p>{gameStatusMessage()}</p>

      {/* buttons for forfeiting or restarting, as applicable */}
      {gameStatus === "ongoing" ? (
        <button onClick={() => forfeit()}>Forfeit</button>
      ) : isOwner ? (
        hasChoice ? (
          <>
            {" "}
            <button onClick={() => startNewGame(viewer)}>
              New Game: Go First
            </button>
            <button onClick={() => startNewGame(1 - viewer)}>
              New Game: Go Second
            </button>
          </>
        ) : (
          <button onClick={startNewGame}>New Game</button>
        )
      ) : (
        <p>
          Waiting for your opponent to start{" "}
          {gameStatus === "waiting" ? "the " : "a new "}
          game.
        </p>
      )}
    </>
  );
}

export default SingleFooter;
