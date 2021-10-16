import "./board.css";

function Board({ viewer, board, isViewersTurn, colours, moveHandler }) {
  const rows = board.length;
  let tableRows = [];
  // the first row goes on the bottom, visually
  for (let row = rows - 1; row > -1; row--) {
    tableRows.push(
      <Row
        key={row}
        row={board[row]}
        viewer={viewer}
        isViewersTurn={isViewersTurn}
        moveHandler={moveHandler}
        colours={colours}
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

function Row({ row, viewer, isViewersTurn, moveHandler, colours }) {
  let rowCells = row.map(({ player, isHighlight, colIsOpen }, col) => {
    return (
      <Cell
        key={col}
        clickHandler={() => moveHandler(col)} // TEMP: moveHandler(col, viewer)
        colour={colours[player]}
        isHighlight={isHighlight}
        isClickable={isViewersTurn && colIsOpen}
      />
    );
  });

  return <tr>{rowCells}</tr>;
}

function Cell({ clickHandler, colour, isHighlight, isClickable }) {
  // colours/styles
  // TODO: dynamic colour (post "||")
  const backgroundColor = colour || "White";
  const borderColor = isHighlight
    ? oppColour(backgroundColor)
    : backgroundColor;
  const pieceStyle = { backgroundColor, borderColor };

  const cellClass = isClickable ? "clickable cell" : "cell";

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
