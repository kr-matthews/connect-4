import "./board.css";

function Board({ board, placePiece, winningIndices, colours }) {
  // TODO: use placePiece
  // TODO: fix winningIndices (probably refactor inside hook)
  let rows = board.length;
  var tableRows = [];
  // the first row goes on the bottom, visually
  for (let row = rows - 1; row > -1; row--) {
    tableRows.push(
      <Row
        key={row}
        row={board[row]}
        colours={colours}
        winningIndices={winningIndices}
      />
    );
  }

  return (
    <table className="board">
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function Row({ key, row, colours, winningIndices }) {
  var rowCells = row.map((player, col) => {
    return (
      <Cell
        key={col}
        player={player}
        colours={colours}
        winningCell={winningIndices[key][col]}
      />
    );
  });

  return <tr>{rowCells}</tr>;
}

function Cell({ player, colours, winningCell }) {
  function styleColour() {
    let backgroundColor = colours[player];
    let borderColor = winningCell
      ? oppositeColour(backgroundColor)
      : backgroundColor;
    return { backgroundColor, borderColor };
  }

  return (
    <td className="cell">
      {player !== null && <span className="piece" style={styleColour()}></span>}
    </td>
  );
}

function oppositeColour(colour) {
  // TODO: calculate opposite colour (just using DarkGray for now)
  return "DarkGray";
}

export default Board;
