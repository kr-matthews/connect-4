import "./results.css";

function Results({ resultHistory, headings }) {
  return (
    <div className="results">
      <div className="result left side">
        <div>{headings[0]}:</div>
        <div>{resultHistory.wins}</div>
      </div>
      <div className="result middle">
        <div>{headings[1]}:</div>
        <div>{resultHistory.draws}</div>
      </div>
      <div className="result right side">
        <div>{headings[2]}:</div>
        <div>{resultHistory.loses}</div>
      </div>
    </div>
  );
}

export default Results;
