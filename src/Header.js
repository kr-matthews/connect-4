function Header({ playerCount, opponent, resultHistory }) {
  // TODO: improve Header design/css
  return playerCount === 1 ? (
    <>
      <p>Waiting for an opponent to join the room.</p>
      <p>
        TODO: Games restart with winner/loser/random/alternating going first.
      </p>
      <p>TOOD: close room button</p>
    </>
  ) : (
    <>
      <p>
        {" "}
        {/* TODO: get Blue from context */}
        <span style={{ color: "Blue" }}>You</span> are playing against{" "}
        <span style={{ color: opponent.colour }}>{opponent.name}</span>
      </p>
      <div>Wins: {resultHistory.wins}</div>
      <div>Draws: {resultHistory.draws}</div>
      <div>Loses: {resultHistory.loses}</div>
      <p>
        TODO: Games restart with winner/loser/random/alternating going first.
      </p>
      <p>TODO: kick opponent button</p>
      <p>TODO: close room button</p>
    </>
  );
}

export default Header;
