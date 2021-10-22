function GameFooter({
  viewer,
  isOwner,
  gameStatus,
  winner,
  toPlayNext,
  forfeitHandler,
  newGameHandler,
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
      default:
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
        <button onClick={() => forfeitHandler(viewer)}>Forfeit</button>
      ) : (
        isOwner && <button onClick={newGameHandler}>New Game</button>
      )}
    </>
  );
}

export default GameFooter;
