import "./board.css";

function Board({ board, placePiece, colours, toPlayNext }) {
  let rows = board.length;
  let tableRows = [];
  // the first row goes on the bottom, visually
  for (let row = rows - 1; row > -1; row--) {
    tableRows.push(
      <Row
        key={row}
        row={board[row]}
        placePiece={placePiece}
        colours={colours}
        toPlayNext={toPlayNext}
      />
    );
  }

  return (
    <table className="board">
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function Row({ row, placePiece, colours, toPlayNext }) {
  let rowCells = row.map(({ player, inLine }, col) => {
    return (
      <Cell
        key={col}
        col={col}
        player={player}
        placePiece={placePiece}
        colours={colours}
        inLine={inLine}
        toPlayNext={toPlayNext}
      />
    );
  });

  return <tr>{rowCells}</tr>;
}

function Cell({ col, player, placePiece, colours, inLine, toPlayNext }) {
  function styleColour() {
    let backgroundColor = colours[player];
    let borderColor = inLine
      ? oppositeColour(backgroundColor)
      : backgroundColor;
    return { backgroundColor, borderColor };
  }
  const cellClass = player === null ? "clickable cell" : "cell";
  const cellOnClick = player === null ? placePiece : (a, b) => {};

  return (
    <td className={cellClass} onClick={() => cellOnClick(toPlayNext, col)}>
      {player !== null && <span className="piece" style={styleColour()}></span>}
    </td>
  );
}

function oppositeColour(colour) {
  // TODO: calculate opposite colour (just using DarkGray for now)
  return "DarkGray";
}

export default Board;
export { Row, Cell }; // for testing
