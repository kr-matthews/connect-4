import { useState, useEffect } from "react";

// fiddle around with these parameters for artificially delayed play time
const maxThinkTime = 3000;
const minThinkTime = 500;
const randomFactorRange = 500;

// fiddle around with these parameters for line scores
function scoreOwnLine(pieceCount, lineLen) {
  // linear, with bonus for lineLen - 2 pieces (lineLen - 1 is irrelevant)
  return 3 * pieceCount + (pieceCount < lineLen - 2 ? 1 : 3);
}
function scoreOppLine(pieceCount, lineLen) {
  // linear, with bonus for lineLen - 2 pieces (lineLen - 1 is irrelevant)
  return 3 * pieceCount + (pieceCount < lineLen - 2 ? 0 : 2);
}

// only does anything if active, and active never changes while mounted
function useComputerPlayer(
  active,
  computerIndex,
  computersTurn,
  dropInCol,
  forfeit,
  keyAttributes,
  boardStats
) {
  //// States

  // flag indicating whether a move needs to be made
  const [playNow, setPlayNow] = useState(false);

  //// Constants

  const { rows, cols, lineLen } = keyAttributes;
  // just down for vertical, and all possiblilities for 3 other directions
  const maxNotableLinesThroughPosition = 3 * lineLen + 1;

  // board info from useGame hook
  const { positions, columns, linesThrough } = boardStats;
  const piecesPlayed = (() => {
    let ans = 0;
    columns.forEach(
      ({ isFull, firstOpenRow }) => (ans += isFull ? rows : firstOpenRow)
    );
    return ans;
  })();

  // array of scores of each column; used for nextMove and thinkTime
  const scores = columns.slice().map(calculateScore);

  // col index to play in next
  const nextMove = getNextMove(scores);

  // timeout cmomputer will use
  const thinkTime = getThinkTime(scores);

  //// Helpers

  // -1 for invalid play, otherwise a positive score
  function calculateScore(col, c) {
    if (col.isFull) {
      return -1;
    }

    // column is not full; tally the types of lines through this position
    const r = col.firstOpenRow;
    let lineTypeCounts = {
      empty: 0,
      dead: 0, // impossible for anyone to use to win
      self: new Array(lineLen).fill(0), // ith: i of own pieces, 0 of opp
      opp: new Array(lineLen).fill(0), //ith: 0 of own pieces, i of opp
    };
    linesThrough(r, c).forEach((line) => addLineType(lineTypeCounts, line));

    // booleans
    const wouldWin = lineTypeCounts["self"][lineLen - 1] > 0;
    const wouldBlockOppWin = lineTypeCounts["opp"][lineLen - 1] > 0;
    const oppCouldWinOnTop =
      r < rows - 1 && positions[r + 1][c].wouldWin[1 - computerIndex];
    const oppCouldBlockWinOnTop =
      r < rows - 1 && positions[r + 1][c].wouldWin[computerIndex];
    // const wouldSetupSelfForLater = lineTypeCounts["self"][lineLen - 2] > 0;
    // const wouldBlockOppSetupForLater = lineTypeCounts["opp"][lineLen - 2] > 0;

    const elseScoreUpperBound = Math.max(
      3,
      maxNotableLinesThroughPosition * (lineLen - 1)
    );

    // given above booleans, assign a score to this column
    if (wouldWin) {
      return elseScoreUpperBound * 3;
    } else if (wouldBlockOppWin) {
      return elseScoreUpperBound * 2;
    } else if (oppCouldWinOnTop) {
      return 1;
    } else if (oppCouldBlockWinOnTop) {
      return 2;
    } else {
      // empty is worth 1
      let score = lineTypeCounts["empty"];
      lineTypeCounts["self"].forEach((lineTypeCount, pieceCount) => {
        // non-empty line with only own pieces is worth 3, 5, 7, ...
        score += scoreOwnLine(pieceCount, lineLen) * lineTypeCount;
      });
      lineTypeCounts["opp"].forEach((lineTypeCount, pieceCount) => {
        // non-empty line with only opp pieces is worth 2, 4, 6, ...
        score += scoreOppLine(pieceCount, lineLen) * lineTypeCount;
      });
      return Math.max(3, score); // ensure greater than oppCouldBlockWinOnTop case
    }
  }

  // increase onw of the counts
  function addLineType(lineTypeCounts, { isWinner, counts, fill }) {
    if (counts[0] === 0 && counts[1] === 0) {
      // no pieces in this line
      lineTypeCounts["empty"] += 1;
    } else if (fill !== "fillable" || counts[0] * counts[1] > 0) {
      // can't be filled, or it already has both pieces
      lineTypeCounts["dead"] += 1;
    } else if (counts[computerIndex] > 0) {
      // only own pieces in this line
      lineTypeCounts["self"][counts[computerIndex]] += 1;
    } else {
      // only opp pieces in this line
      lineTypeCounts["opp"][counts[1 - computerIndex]] += 1;
    }
  }

  // pick an index of maximum score
  function getNextMove(scores) {
    // find all indices of the largest score
    let maxVal = -1;
    let indicesOfMax = [];
    scores.forEach((score, ind) => {
      if (score > maxVal) {
        maxVal = score;
        indicesOfMax = [ind];
      } else if (score === maxVal) {
        indicesOfMax.push(ind);
      }
    });
    // select a random index among those of the largest score
    return indicesOfMax[Math.floor(Math.random() * indicesOfMax.length)];
  }

  // based on the difference between the top two scores
  // (assumes valid scores are non-neg, and at least one positive)
  function getThinkTime(scores) {
    // very early in the game, usually easier to play, so adjust maxThinkTime
    const thisMaxThinkTime = Math.max(
      minThinkTime,
      maxThinkTime * Math.sqrt((piecesPlayed + 3) / (rows * cols + 3))
    );
    // find the largest two scores (duplicates are distinct)
    let firstMax = -1;
    let secondMax = -1;
    scores.forEach((score) => {
      if (score > firstMax) {
        secondMax = firstMax;
        firstMax = score;
      } else if (score > secondMax) {
        secondMax = score;
      }
    });

    if (secondMax === -1) {
      // only one valid play, so pick "immediately"
      return minThinkTime;
    }

    // otherwise, top two plays are valid and can look at ratio between 0 and 1
    // top two are guaranteed to be positive
    // ratio should be at most 1 anyway, but add bound just in case
    const ratio = Math.min(1, secondMax / firstMax);
    const randomFactor =
      Math.random() * randomFactorRange - randomFactorRange / 2;
    // the larger the fraction, the longer the move should take
    return Math.min(
      thisMaxThinkTime,
      Math.max(minThinkTime, thisMaxThinkTime * ratio + randomFactor)
    );
  }

  //// Effects

  // trigger flag when necessary
  useEffect(() => {
    if (active && computersTurn) {
      setPlayNow(true);
    }
  }, [active, computersTurn]);

  // play when flag is raised
  // (yes, it's ok to run every re-render)
  // eslint-disable-next-line
  useEffect(() => {
    if (playNow) {
      console.log(Math.floor(thinkTime), scores); // TEMP:

      setTimeout(() => dropInCol(nextMove), thinkTime);
      setPlayNow(false);
    }
  });
}

export { useComputerPlayer };
