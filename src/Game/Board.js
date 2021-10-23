import { useContext } from "react";

import { ThemeContext } from "./../App.js";

import "./board.css";

function Board({ viewer, board, isViewersTurn, colours, moveHandler }) {
  const { foreground } = useContext(ThemeContext);
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

  return (
    <table className="board" style={{ backgroundColor: foreground }}>
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
  const { background, foreground } = useContext(ThemeContext);
  const backgroundColor = colour || background;
  // TODO: LATER: COLOUR: make highlight opp colour of piece
  const borderColor = isHighlight ? background : backgroundColor;
  const pieceStyle = { backgroundColor, borderColor };

  const cellClass = isClickable ? "clickable cell" : "cell";
  const cellStyle = { borderColor: foreground };

  return (
    <td className={cellClass} style={cellStyle} onClick={clickHandler}>
      <span className="piece" style={pieceStyle}></span>
    </td>
  );
}

export default Board;
export { Row, Cell }; // for testing
