import "./board.css";

function Board({ viewer, board, toPlayNext, colours, placePiece }) {
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

  // TODO: dynamic colour
  return (
    <table className="board" style={{ backgroundColor: "Black" }}>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function Row({ viewer, row, placePiece, colours, toPlayNext }) {
  let rowCells = row.map(({ player, isHighlight }, col) => {
    return (
      <Cell
        key={col}
        viewer={viewer}
        col={col}
        player={player}
        placePiece={placePiece}
        colours={colours}
        isHighlight={isHighlight}
        toPlayNext={toPlayNext}
      />
    );
  });

  return <tr>{rowCells}</tr>;
}

function Cell({
  viewer,
  col,
  player,
  placePiece,
  colours,
  isHighlight,
  toPlayNext,
}) {
  // colours/styles
  // TODO: dynamic colour (post "||")
  const backgroundColor = colours[player] || "White";
  const borderColor = isHighlight
    ? oppColour(backgroundColor)
    : backgroundColor;
  const pieceStyle = { backgroundColor, borderColor };

  // can click if there is no piece && the viewer is next to play
  // note that if game is over, toPlayNext is null so this works
  const isClickable = player === null && viewer === toPlayNext;
  const cellClass = isClickable ? "clickable cell" : "cell";
  const clickHandler = () => player === null && placePiece(toPlayNext, col);
  // TEMP: change clickHandler pre "&&" to isClickable, as in cellClass

  return (
    <td className={cellClass} onClick={clickHandler}>
      <span className="piece" style={pieceStyle}></span>
    </td>
  );
}

function oppColour(colour) {
  // TODO: calculate opposite colour; probably move this function elsewhere
  return "White";
}

export default Board;
export { Row, Cell }; // for testing
