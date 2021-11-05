function RoomHeader({
  roomCode,
  isOwner,
  opponent,
  restartMethod,
  resultHistory,
  kickOpponent,
  closeRoom,
  leaveRoom,
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

  // TODO: UI: improve Header design/css, reorganize into sub-components

  return (
    <>
      {/* describe opponent, or say waiting for one */}
      {opponent ? (
        <div>
          You are playing against{" "}
          <span style={{ color: opponent.colour }}>{opponent.name}</span>.
        </div>
      ) : isOwner ? (
        <div>Waiting for an opponent to join the room.</div>
      ) : (
        <div>
          Waiting for opponent information to be fetched. If this message
          persists, something has gone wrong.
        </div>
      )}

      {/* who owns the room, and the code */}
      {isOwner ? (
        <div>You created and are in control of this room.</div>
      ) : opponent ? (
        <div>
          You are in {opponent.name}'s room. They have control of the room.
        </div>
      ) : (
        <div>You do not have control of this room.</div>
      )}
      <div>
        The room code is <button onClick={copyToClipboard}>{roomCode}</button>.
      </div>

      {/* explain who goes first for new games */}
      {restartMethod && <div>{restartMethodMessage}</div>}

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
          <button onClick={closeRoom}>Close Room</button>
        ) : (
          <button onClick={leaveRoom}>Leave Room</button>
        )}
        {isOwner && opponent && (
          <button onClick={kickOpponent}>Kick Opponent</button>
        )}
      </div>
    </>
  );
}

export default RoomHeader;
