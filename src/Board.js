function Board({ board, placePiece, winningIndices, colours }) {
  // TODO: Board component
  let rows = board.length;
  var tableRows = [];
  for (let row = rows - 1; row > -1; row--) {
    tableRows.push(<Row key={row} row={board[row]} />);
  }

  return (
    <table>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function Row({ row }) {
  var rowCells = row.map((cell, col) => {
    return <Cell key={col} cell={cell} />;
  });
  return <tr>{rowCells}</tr>;
}

function Cell({ cell }) {
  return <td>{cell}</td>;
}

export default Board;
