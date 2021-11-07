function Results({ resultHistory, headings }) {
  // TODO: UI: Results

  return (
    <div>
      <span>
        {headings[0]}: {resultHistory.wins} --{" "}
      </span>
      <span>
        {headings[1]}: {resultHistory.draws} --{" "}
      </span>
      <span>
        {headings[2]}: {resultHistory.loses}
      </span>
    </div>
  );
}

export default Results;
