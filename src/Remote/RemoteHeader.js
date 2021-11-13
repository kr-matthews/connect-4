import Results from "./../Game/Results.js";

// TODO: NETWORK: add a "confirm my connection" button?

function RemoteHeader({
  roomCode,
  isOwner,
  hasOpponent,
  restartMethod,
  resultHistory,
  kickOpponent,
  closeRoom,
  leaveRoom,
}) {
  const restartMethodMessage =
    "In this room, " +
    (restartMethod === "random"
      ? "the first player of a new game is selected randomly."
      : restartMethod === "alternate"
      ? "players alternate playing first in a new game."
      : // else it's "winner" or "loser"
        "the " +
        restartMethod +
        " of a game will go first for the next game. In the event of a draw, the same player will go first.");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(roomCode);
    alert("Room code " + roomCode + " copied to clipboard.");
  };

  // TODO: UI: improve Header design/css, reorganize into sub-components

  return (
    <>
      {/* display W-D-L history against this opponent */}
      {hasOpponent && (
        <Results
          resultHistory={resultHistory}
          headings={["Wins", "Draws", "Loses"]}
        />
      )}

      {hasOpponent ? (
        /* who is in control */
        isOwner ? (
          <div>You created and are in control of this room.</div>
        ) : (
          <div>Your opponent created and has control of this room.</div>
        )
      ) : /* waiting message & room code */
      isOwner ? (
        <div>
          Waiting for an opponent to join your room. Share your room code{" "}
          <button onClick={copyToClipboard}>{roomCode}</button> with a friend.
        </div>
      ) : (
        <div>
          Waiting for opponent information to be fetched. If this message
          persists, then something has gone wrong. The room code is {roomCode}.
        </div>
      )}

      {/* explain who goes first for new games */}
      {restartMethod && <div>{restartMethodMessage}</div>}

      {/* options to close/leave room or kick opponent, as applicable */}
      <div>
        {isOwner ? (
          <button onClick={closeRoom}>Close Room</button>
        ) : (
          <button onClick={leaveRoom}>Leave Room</button>
        )}
        {isOwner && hasOpponent && (
          <button onClick={kickOpponent}>Kick Opponent</button>
        )}
      </div>
    </>
  );
}

export default RemoteHeader;
