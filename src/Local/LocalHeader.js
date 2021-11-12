import Results from "./../Game/Results.js";

function LocalHeader({ hasOpponent, names, resultHistory, unmount }) {
  const textAboutOpponent = hasOpponent
    ? "You're playing locally with a friend on the same screen."
    : "You're playing against the computer.";
  const headings = hasOpponent
    ? [names[0] + " Wins", "Draws", names[1] + " Wins"]
    : ["Wins", "Draws", "Loses"];

  return (
    <div>
      <Results resultHistory={resultHistory} headings={headings} />
      <p>{textAboutOpponent}</p>
      <button onClick={unmount}>Return to Lobby</button>
    </div>
  );
}

export default LocalHeader;
