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

// check whether the board is full
export function isFull(keyAttributes) {
  const { pieces, rows, cols } = keyAttributes;
  // check the top row for nulls
  for (let col = 0; col < cols; col++) {
    if (pieces[rows - 1][col] === null) {
      return false;
    }
  }
  return true;
}

export function isSpotInLine(row, col, keyAttributes) {
  const { pieces } = keyAttributes;
  const player = pieces[row][col];
  if (player === null) {
    // nobody played here so it's obviously not a win
    return false;
  }

  for (let d = 0; d < directions.length; d++) {
    const [d_r, d_c] = directions[d];
    // check for a win using given piece in direction directions[d]
    for (let j = -3; j < 1; j++) {
      // check for a win in the direction starting from offset of j
      if (
        checkLine(player, row + j * d_r, col + j * d_c, d_r, d_c, keyAttributes)
      ) {
        return true;
      }
    }
  }
  return false;
}

// given a spot and a direction, check if it's a line of 4
export function checkLine(player, row, col, d_r, d_c, keyAttributes) {
  const { pieces, rows, cols, lineLen } = keyAttributes;
  for (let k = 0; k < lineLen; k++) {
    let [r, c] = [row + k * d_r, col + k * d_c];
    // if (r, c) is out of bounds, or doesn't have the right piece
    if (0 > r || r >= rows || 0 > c || c >= cols || pieces[r][c] !== player) {
      return false;
    }
  }
  // all 4 were in-bounds and belonged to player, so return true (they won)
  return true;
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
