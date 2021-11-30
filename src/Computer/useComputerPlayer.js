import { useState, useEffect } from "react";

// TODO: NEXT: doesn't take into account opp playing on top of current move
// TODO: NEXT: counts "dead" lines (those which can't ever win)

// fiddle around with these parameters
// (technically can go over max via random factor -- but won't go under min)
const maxThinkTime = 2300;
const minThinkTime = 500;
const randomFactorRange = 500;

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

  // board info from useGame hook
  const { positions, lines, columns, linesThrough, positionsOn } = boardStats;

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

    // column is not full; score all lines
    const r = col.firstOpenRow;
    let lineTypeCounts = {};
    linesThrough(r, c).forEach((line) => {
      const type = calculateLineType(line);
      lineTypeCounts[type] = (lineTypeCounts[type] || 0) + 1;
    });

    console.log(c, lineTypeCounts); // TEMP:

    // given lineTypeCounts, assign a score
    // most lines you can be in is 13 (but the 3 above would be not so helpful)
    if (lineTypeCounts["win"] > 0) {
      // can win here; do it
      return 70;
    } else if (lineTypeCounts["blockWin"] > 0) {
      // opp will win here next turn; must block
      return 60;
    } else if (lineTypeCounts["setup"] > 1) {
      // can setup multiple winning moves for next turn; do it
      return 50;
    } else if (lineTypeCounts["blockSetup"] > 1) {
      // opp can setup multiple winning moves for next turn; must block
      return 40;
    } else {
      // weighted sum of all lines
      // can assume no win nor blockWin; and at most 1 setup / blockSetup each
      return (
        5 * (lineTypeCounts["setup"] || 0) +
        4 * (lineTypeCounts["blockSetup"] || 0) +
        3 * (lineTypeCounts["extend"] || 0) +
        2 * (lineTypeCounts["blockExtend"] || 0) +
        1 * (lineTypeCounts["empty"] || 0) +
        0 * (lineTypeCounts["mixed"] || 0) +
        1 // just to ensure score is positive
      );
    }
  }

  // ...
  function calculateLineType({ isWinner, counts, status }) {
    switch (2 ** counts[computerIndex] * 3 ** counts[1 - computerIndex]) {
      case 2 ** 0 * 3 ** 0:
        return "empty";
      case 2 ** 3 * 3 ** 0:
        return "win";
      case 2 ** 0 * 3 ** 3:
        return "blockWin";
      case 2 ** 2 * 3 ** 0:
        return "setup";
      case 2 ** 0 * 3 ** 2:
        return "blockSetup";
      case 2 ** 1 * 3 ** 0:
        return "extend";
      case 2 ** 0 * 3 ** 1:
        return "blockExtend";
      default:
        // [1,1], [1,2], and [2,1]
        return "mixed";
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
    return Math.max(minThinkTime, maxThinkTime * ratio + randomFactor);
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
      console.log(scores, thinkTime); // TEMP:

      setTimeout(() => dropInCol(nextMove), thinkTime);
      setPlayNow(false);
    }
  });
}

export { useComputerPlayer };
