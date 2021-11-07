import Results from "./../Game/Results.js";

function ComputerHeader({ resultHistory, unmountComputer }) {
  return (
    <>
      <p>You're playing against the computer.</p>
      <button onClick={unmountComputer}>Return to Lobby</button>
      <Results
        resultHistory={resultHistory}
        headings={["Wins", "Draws", "Loses"]}
      />
    </>
  );
}

export default ComputerHeader;
