import "./gameFooter.css";

function GameFooter({
  sharingScreen,
  viewer,
  isOwner,
  names,
  gameStatus,
  winner,
  toPlayNext,
  forfeit,
  startNewGame,
  hasRestartChoice,
}) {
  // to display to viewer
  function gameStatusMessage() {
    if (sharingScreen) {
      // sharing screen
      switch (gameStatus) {
        case "won":
          return "Congratulations " + names[winner] + ", you won!";
        case "forfeit":
          return (
            names[1 - winner] +
            " forfeit the game -- " +
            names[winner] +
            " wins."
          );
        case "draw":
          return "It's a draw.";
        case "ongoing":
          return "It's " + names[toPlayNext] + "'s turn to play.";
        case "waiting":
          return "The game hasn't started yet.";
        default:
          console.error("Error: ", gameStatus);
          return "Something has gone wrong. Apologies.";
      }
    } else {
      // not sharing screen
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
          return "The game hasn't started yet.";
        default:
          console.error("Error: ", gameStatus);
          return "Something has gone wrong. Apologies.";
      }
    }
  }

  const newGameText = gameStatus === "waiting" ? "the game" : " a new game";

  //  displayed for viewer's point of view
  return (
    <div className="gameFooter">
      {/* explain what's going on with the game */}
      <div>{gameStatusMessage()}</div>

      {/* buttons for forfeiting or restarting, as applicable */}
      <div>
        {gameStatus === "ongoing" ? (
          <button onClick={() => forfeit(viewer)}>Forfeit</button>
        ) : isOwner ? (
          hasRestartChoice ? (
            <>
              To start {newGameText}, select who will go first:{" "}
              <button onClick={() => startNewGame(0)}>{names[0]}</button>
              <button onClick={() => startNewGame(1)}>{names[1]}</button>
            </>
          ) : (
            <>
              Start {newGameText}: <button onClick={startNewGame}>Start</button>
            </>
          )
        ) : (
          <>Waiting for your opponent to start {newGameText}.</>
        )}
      </div>
    </div>
  );
}

export default GameFooter;
