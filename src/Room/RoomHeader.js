function RoomHeader({
  roomCode,
  isOwner,
  opponent,
  restartMethod,
  resultHistory,
  kickOpponentHandler,
  closeRoomHandler,
  leaveRoomHandler,
}) {
  const restartMethodMessage =
    restartMethod === "random"
      ? "The first player of a new game is selected randomly."
      : restartMethod === "alternate"
      ? "Players alternate playing first in a new game."
      : // else it's "winner" or "loser"
        "The " +
        restartMethod +
        " of a game will go first for the next game. In the event of a draw, the same player will go first.";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(roomCode);
    alert("Room code " + roomCode + " copied to clipboard.");
  };

  // TODO: UI: improve Header design/css

  return (
    <>
      {/* describe opponent, or say waiting for one */}
      {opponent ? (
        <div>
          You are playing against{" "}
          <span style={{ color: opponent.colour }}>{opponent.name}</span>.
        </div>
      ) : (
        <div>Waiting for an opponent to join the room.</div>
      )}

      {/* who owns the room, and the code */}
      {isOwner ? (
        <div>You created and are in control of this room.</div>
      ) : (
        <div>
          You are in {opponent.name}'s room. They have control of the room.
        </div>
      )}
      <div>
        The room code is <button onClick={copyToClipboard}>{roomCode}</button>.
      </div>

      {/* explain who goes first for new games */}
      <div>{restartMethodMessage}</div>

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
