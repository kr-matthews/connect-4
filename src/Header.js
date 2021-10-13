function Header({
  isOwner,
  playerCount,
  opponent,
  restartMethod,
  resultHistory,
}) {
  function message() {
    switch (restartMethod) {
      case "random":
        return "The first player of a new game is selected randomly.";
      case "alternate":
        return "Players alternate playing first in a new game.";
      default:
        // "winner" or "loser"
        return (
          "The " +
          restartMethod +
          " of a game will go first for the next game. In the event of a draw, the same player will go first."
        );
    }
  }

  // TODO: improve Header design/css
  return (
    <>
      <div>{message()}</div>
      {playerCount === 1 ? (
        <div>Waiting for an opponent to join the room.</div>
      ) : (
        <div>
          {/* TODO: get Blue from context */}
          <span style={{ color: "Blue" }}>You</span> are playing against{" "}
          <span style={{ color: opponent.colour }}>{opponent.name}</span>.
        </div>
      )}
      {playerCount === 2 && (
        <div>
          <span>Wins: {resultHistory.wins}</span>
          <span>Draws: {resultHistory.draws}</span>
          <span>Loses: {resultHistory.loses}</span>
        </div>
      )}
      <div>
        {isOwner ? <button>Close Room</button> : <button>Leave Room</button>}
        {isOwner && playerCount === 2 && <button>Kick Opponent</button>}
      </div>
    </>
  );
}

export default Header;
