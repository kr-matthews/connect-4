// TODO: UI: improve (both) Footer design/css
// TODO: NEXT: rename this to GameFooter and combine with SingleFooter

function DoubleFooter({
  names,
  gameStatus,
  winner,
  toPlayNext,
  forfeit,
  startNewGame,
}) {
  // to display to both players at once
  function gameStatusMessage() {
    switch (gameStatus) {
      case "won":
        return "Congratulations " + names[winner] + ", you won!";
      case "forfeit":
        return (
          names[1 - winner] + " forfeit the game -- " + names[winner] + " wins."
        );
      case "draw":
        return "It's a draw.";
      case "ongoing":
        return "It's " + names[toPlayNext] + "'s turn to drop a piece.";
      case "waiting":
        return "The game has not started yet.";
      default:
        console.error("Error: ", gameStatus);
        return "Something has gone wrong. Apologies.";
    }
  }

  return (
    <>
      {/* explain what's going on with the game */}
      <p>{gameStatusMessage()}</p>

      {/* buttons for forfeiting or restarting, as applicable */}
      {gameStatus === "ongoing" ? (
        <button onClick={() => forfeit(toPlayNext)}>Forfeit</button>
      ) : (
        <>
          <button onClick={() => startNewGame(0)}>
            New Game: {names[0]} starts
          </button>
          <button onClick={() => startNewGame(1)}>
            New Game: {names[1]} starts
          </button>
        </>
      )}
    </>
  );
}

export default DoubleFooter;
