function Footer({ viewer, toPlayNext, gameStatus, resetGame }) {
  function message() {
    switch (gameStatus) {
      case viewer:
        return "Congratulations, you won!";
      case 1 - viewer:
        return "You lost.";
      case "draw":
        return "It's a draw.";
      case "ongoing":
        return viewer === toPlayNext
          ? "It's your turn to drop a piece."
          : "Waiting for your opponent to move.";
      default:
        return "Something has gone wrong. Apologies.";
    }
  }

  // TODO: improve Footer design/css
  return (
    <>
      <p>{message()}</p>
      {/* TODO: reset with first player based on room settings, not just 0 */}
      <button onClick={() => resetGame(0)}>Reset Game</button>
    </>
  );
}

export default Footer;
