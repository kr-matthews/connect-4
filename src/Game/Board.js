import { useContext } from "react";

import { GradientContext, ThemeContext } from "./../App.js";

import { oppositeColourOf } from "./../Colours.js";

import "./board.css";

// TODO: NEXT: change .player to .piece where applicable, similarly highlights

function Board({ viewer, board, isViewersTurn, colours, makeMove }) {
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
        makeMove={makeMove}
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

function Row({ row, viewer, isViewersTurn, makeMove, colours }) {
  const usingGradient = useContext(GradientContext);

  let rowCells = row.map(({ player, isHighlight, colIsOpen }, col) => {
    return (
      <Cell
        key={col}
        clickHandler={() => makeMove(col, viewer)}
        colour={colours[player]}
        useGradient={
          player !== null &&
          (usingGradient === "all" ||
            (usingGradient === "my" && player === 0) ||
            (usingGradient === "their" && player === 1))
        }
        isHighlight={isHighlight}
        isClickable={isViewersTurn && colIsOpen}
      />
    );
  });

  return <tr>{rowCells}</tr>;
}

function Cell({ clickHandler, colour, useGradient, isHighlight, isClickable }) {
  // colours/styles -- bit of a mess
  const { background, foreground } = useContext(ThemeContext);
  const backgroundColor = colour || background;
  const borderColor = isHighlight
    ? oppositeColourOf(backgroundColor)
    : backgroundColor;
  const pieceStyle = { backgroundColor, borderColor };
  const gradientPieceStyle = {
    borderColor,
    backgroundImage:
      "radial-gradient(" + backgroundColor + "," + backgroundColor + "70)",
  };

  const cellClass = isClickable ? "clickable cell" : "cell";
  const cellStyle = { borderColor: foreground };

  return (
    <td className={cellClass} style={cellStyle} onClick={clickHandler}>
      <span
        className="piece"
        style={useGradient ? gradientPieceStyle : pieceStyle}
      ></span>
    </td>
  );
}

export default Board;
export { Row, Cell }; // for testing
