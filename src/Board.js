import "./board.css";

function Board({ viewer, board, placePiece, colours, toPlayNext }) {
  const rows = board.length;
  let tableRows = [];
  // the first row goes on the bottom, visually
  for (let row = rows - 1; row > -1; row--) {
    tableRows.push(
      <Row
        key={row}
        viewer={viewer}
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

function Row({ viewer, row, placePiece, colours, toPlayNext }) {
  let rowCells = row.map(({ player, inLine }, col) => {
    return (
      <Cell
        key={col}
        viewer={viewer}
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

// TODO: cell should only be clickable if current player is next player
//  and if game is ongoing
function Cell({
  viewer,
  col,
  player,
  placePiece,
  colours,
  inLine,
  toPlayNext,
}) {
  function styleColour() {
    let backgroundColor = colours[player];
    let borderColor = inLine
      ? oppositeColour(backgroundColor)
      : backgroundColor;
    return { backgroundColor, borderColor };
  }
  const cellClass =
    player === null && viewer === toPlayNext ? "clickable cell" : "cell";
  const cellOnClick = player === null ? placePiece : (a, b) => {};
  // TEMP: change cellOnClick check to include 'viewer === toPlayNext', as in cellClass

  return (
    <td className={cellClass} onClick={() => cellOnClick(toPlayNext, col)}>
      {player !== null && <span className="piece" style={styleColour()}></span>}
    </td>
  );
}

function oppositeColour(colour) {
  // TODO: calculate opposite colour (just using Black for now)
  return "Black";
}

export default Board;
export { Row, Cell }; // for testing
