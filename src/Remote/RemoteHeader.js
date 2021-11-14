import Results from "./../Game/Results.js";

import "./remoteHeader.css";

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
      ? "the first player of subsequent games is selected randomly."
      : restartMethod === "alternate"
      ? "players alternate playing first in subsequent games."
      : // else it's "winner" or "loser"
        "the " +
        restartMethod +
        " of a game will go first for the next game. (In the event of a draw, the same player will go first.)");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(roomCode);
    alert("Room code " + roomCode + " copied to clipboard.");
  };

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
          <p>You created and are in control of this room.</p>
        ) : (
          <p>Your opponent created and has control of this room.</p>
        )
      ) : /* waiting message & room code */
      isOwner ? (
        <p>
          Waiting for an opponent to join your room. Share your room code{" "}
          <button onClick={copyToClipboard}>{roomCode}</button> with a friend.
        </p>
      ) : (
        <p>
          Waiting for opponent information to be fetched. (If this message
          persists, then something has gone wrong.).
        </p>
      )}

      {/* explain who goes first for new games */}
      {restartMethod && <p>{restartMethodMessage}</p>}

      {/* options to close/leave room or kick opponent, as applicable */}
      <div className={hasOpponent ? "" : "exitRoom"}>
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
