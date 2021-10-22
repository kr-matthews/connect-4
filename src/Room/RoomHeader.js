function RoomHeader({
  isOwner,
  opponent,
  restartMethod,
  resultHistory,
  kickOpponentHandler,
  closeRoomHandler,
  leaveRoomHandler,
}) {
  function restartMethodMessage() {
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

  // TODO: UI: improve Header design/css
  return (
    <>
      {/* explain who goes first for new games */}
      <div>{restartMethodMessage()}</div>

      {/* describe opponent, or say waiting for one */}
      {opponent ? (
        <div>
          You are playing against{" "}
          <span style={{ color: opponent.colour }}>{opponent.name}</span>.
        </div>
      ) : (
        <div>Waiting for an opponent to join the room.</div>
      )}

      {/* display W-D-L history against this opponent */}
      {opponent && (
        <div>
          <span>Wins: {resultHistory.wins}</span>
          <span>Draws: {resultHistory.draws}</span>
          <span>Loses: {resultHistory.loses}</span>
        </div>
      )}

      {/* options to close/leave room or kick opponent, as applicable */}
      <div>
        {isOwner ? (
          <button onClick={closeRoomHandler}>Close Room</button>
        ) : (
          <button onClick={leaveRoomHandler}>Leave Room</button>
        )}
        {isOwner && opponent && (
          <button onClick={kickOpponentHandler}>Kick Opponent</button>
        )}
      </div>
    </>
  );
}

export default RoomHeader;
