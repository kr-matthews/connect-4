import { useContext } from "react";

import { GradientContext, ThemeContext } from "./../App.js";

import { oppositeColourOf } from "./../Colours.js";

import "./board.css";

function Board({
  viewer,
  positions,
  columns,
  isViewersTurn,
  colours,
  makeMove,
}) {
  const { foreground } = useContext(ThemeContext);
  const rows = positions.length;
  let tableRows = [];
  // the first row goes on the bottom, visually
  for (let r = rows - 1; r > -1; r--) {
    tableRows.push(
      <Row
        key={r}
        row={positions[r]}
        columns={columns}
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

function Row({ row, columns, viewer, isViewersTurn, makeMove, colours }) {
  const usingGradient = useContext(GradientContext);

  let rowCells = row.map(({ piece, wouldWin, isWinner }, col) => {
    return (
      <Cell
        key={col}
        handleClick={() => makeMove(col, viewer)}
        colour={colours[piece]}
        useGradient={
          piece !== null &&
          (usingGradient === "all" ||
            (usingGradient === "my" && piece === 0) ||
            (usingGradient === "their" && piece === 1))
        }
        isHighlight={isWinner}
        isClickable={isViewersTurn && !columns[col].isFull}
      />
    );
  });

  return <tr>{rowCells}</tr>;
}

function Cell({ handleClick, colour, useGradient, isHighlight, isClickable }) {
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
    <td className={cellClass} style={cellStyle} onClick={handleClick}>
      <span
        className="piece"
        style={useGradient ? gradientPieceStyle : pieceStyle}
      ></span>
    </td>
  );
}

export default Board;
export { Row, Cell }; // for testing
