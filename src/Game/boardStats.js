const primaryDirections = [
  [0, 1], // right
  [1, 1], // up-right
  [1, 0], // up
  [1, -1], // up-left
];

// provide full statistics for each position and each line (of length lineLen)
export function boardStats({ pieces, rows, cols, lineLen }) {
  //// Calculations to do

  // two "matrices"
  let columns = []; // 1D: col
  let positions = []; // 2D: row col
  let lines = []; // 4D: row col deltaRow deltaCol

  // lines: check isInBounds, piece counts when applicable, and if it's a winner
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      let col = [{}, {}];
      primaryDirections.forEach(([deltaR, deltaC], i) => {
        col[deltaR][deltaC] = basicLineStats(r, c, deltaR, deltaC);
      });
      row.push(col);
    }
    lines.push(row);
  }

  // positions: who has played here, have they won here; is the column full,
  //  and which players would win by playing here
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(basicPositionStats(r, c));
    }
    positions.push(row);
  }

  // TODO: NEXT: (maybe) replace status with type; alive expands to more details?
  //  hm maybe not

  // lines: find status (full, alive, dead)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      primaryDirections.forEach(([deltaR, deltaC], i) => {
        let line = lines[r][c][deltaR][deltaC];
        if (line.isInBounds) {
          let status = "alive";
          if (line.counts[0] + line.counts[1] === lineLen) {
            status = "full";
          } else {
            // check whether there's a spot below any spot in this line which
            //  both players would win in
            for (let offset = 0; offset < lineLen; offset++) {
              // a spot on the line
              let [r2, c2] = [r + offset * deltaR, c + offset * deltaC];
              for (let subR2 = 0; subR2 < r2; subR2++) {
                // a spot below the line
                const position = positions[subR2][c2];
                if (position.isHot) {
                  status = "dead";
                }
              }
            }
          }
          line.status = status;
        }
      });
    }
  }

  // column stats: isFull, firstOpenRow
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (positions[row][col].piece === null) {
        columns.push({ isFull: false, firstOpenRow: row });
        break;
      } else if (row === rows - 1) {
        columns.push({ isFull: true });
      }
    }
  }

  //// Internal Helper functions

  // is [r,c] actually on the board
  function positionInBounds(r, c) {
    return 0 <= r && r < rows && 0 <= c && c < cols;
  }

  // isInBounds (boolean), isWinner (boolean), piece counts
  function basicLineStats(r, c, deltaR, deltaC) {
    let counts = [0, 0];
    // check each spot
    for (let ind = 0; ind < lineLen; ind++) {
      // given position on line...
      const [r2, c2] = [r + ind * deltaR, c + ind * deltaC];
      // ... is it in bounds?
      if (!positionInBounds(r2, c2)) {
        // a position on the line is out of bounds, return failure
        return { isInBounds: false };
      }
      // ... what piece is it in, if any?
      if (pieces[r2][c2] !== null) {
        counts[pieces[r2][c2]] += 1;
      }
    }
    const isWinner = counts[0] === lineLen || counts[1] === lineLen;
    return { isInBounds: true, isWinner, counts };
  }

  // is column full (boolean), piece (player index),
  //  would win by playing here (array of index), isWinner (boolean)
  function basicPositionStats(r, c) {
    const piece = pieces[r][c];
    const wouldWin = checkWouldWin(r, c);
    const isHot = wouldWin.every((i) => i);
    const isWinner = checkWinner(r, c);
    return { piece, wouldWin, isHot, isWinner };
  }

  // check each line to see if it's been won
  function checkWinner(r, c) {
    if (pieces[r][c] === null) {
      // no need to check all lines if there's no piece here
      return false;
    }
    // check all lines going through [r, c]
    for (let ind = 0; ind < primaryDirections.length; ind++) {
      const [deltaR, deltaC] = primaryDirections[ind];
      for (let offset = 1 - lineLen; offset <= 0; offset++) {
        // a spot to start a line which goes through [r, c]
        const [r2, c2] = [r + offset * deltaR, c + offset * deltaC];
        if (positionInBounds(r2, c2)) {
          // said line
          const line = lines[r2][c2][deltaR][deltaC];
          if (line.isInBounds && line.isWinner) {
            // found a winning line
            return true;
          }
        }
      }
    }
    // didn't find a winner
    return false;
  }

  // check each line to see if it's the only missing piece to win
  function checkWouldWin(r, c) {
    let wouldWin = [false, false];
    if (pieces[r][c] === null) {
      // only bother checking each line if nobody has played here yet
      primaryDirections.forEach(([deltaR, deltaC]) => {
        for (let offset = 1 - lineLen; offset < lineLen; offset++) {
          // a spot on the line
          const [r2, c2] = [r + offset * deltaR, c + offset * deltaC];
          if (positionInBounds(r2, c2)) {
            const line = lines[r2][c2][deltaR][deltaC];
            if (line.isInBounds && line.counts[0] === lineLen - 1) {
              wouldWin[0] = true;
            } else if (line.isInBounds && line.counts[1] === lineLen - 1) {
              wouldWin[1] = true;
            }
          }
        }
      });
    }
    return wouldWin;
  }

  return { positions, lines, columns };
}
