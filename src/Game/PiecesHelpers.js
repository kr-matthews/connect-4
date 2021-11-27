// NOTE: this will all be deleted once useComputerPlayer.js switches over to
//  using the stats from useGame

// the possible line directions from/to a fixed point
export const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];
// the possible line orientations (opposite directions being the same)
export const orientations = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

// find row that piece will end up in when dropped in this col
export function findEmptyRow(col, keyAttributes) {
  const { pieces, rows } = keyAttributes;
  for (let row = 0; row < rows; row++) {
    if (pieces[row][col] === null) {
      return row;
    }
  }
  return null;
}

// is the line within the board
export function inBounds(row, col, offset, d_r, d_c, keyAttributes) {
  const [rowStart, colStart] = [row + d_r * -offset, col + d_c * -offset];
  const [rowEnd, colEnd] = [
    rowStart + d_r * (keyAttributes.lineLen - 1),
    colStart + d_c * (keyAttributes.lineLen - 1),
  ];
  return (
    0 <= rowStart &&
    rowStart < keyAttributes.rows &&
    0 <= rowEnd &&
    rowEnd < keyAttributes.rows &&
    0 <= colStart &&
    colStart < keyAttributes.cols &&
    0 <= colEnd &&
    colEnd < keyAttributes.cols
  );
}

// counting pieces in a line
export function countPiecesInLine(
  row,
  col,
  offset,
  d_r,
  d_c,
  player,
  keyAttributes
) {
  let count = 0;
  for (let k = 0; k < keyAttributes.lineLen; k++) {
    if (
      keyAttributes.pieces[row + d_r * (-offset + k)][
        col + d_c * (-offset + k)
      ] === player
    ) {
      count += 1;
    }
  }
  return count;
}
