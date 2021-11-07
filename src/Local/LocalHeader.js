import Results from "./../Game/Results.js";

function LocalHeader({ resultHistory, names, unmountLocal }) {
  return (
    <>
      <p>You're playing locally with a friend on the same screen.</p>
      <button onClick={unmountLocal}>Return to Lobby</button>
      <Results
        resultHistory={resultHistory}
        headings={[names[0] + " Wins", "Draws", names[1] + " Wins"]}
      />
    </>
  );
}

export default LocalHeader;
