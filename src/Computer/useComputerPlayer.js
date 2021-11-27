import {
  orientations,
  findEmptyRow,
  inBounds,
  countPiecesInLine,
} from "./../Game/PiecesHelpers.js";
import { useState, useEffect } from "react";

// TODO: NEXT: refactor to use stats from useGame, instead of doing all self
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
  keyAttributes
) {
  //// States/Flags

  // flag indicating whether a move needs to be made
  const [playNow, setPlayNow] = useState(false);

  //// Helper functions/constants

  // return array with ith spot being score for playing in col i
  function getAllScores() {
    let moveOptions = [];
    for (let col = 0; col < keyAttributes.cols; col++) {
      moveOptions.push(calculateScore(col));
    }
    return moveOptions;
  }

  // -1 for invalid play, otherwise a positive score
  function calculateScore(col) {
    const row = findEmptyRow(col, keyAttributes);
    if (row === null) {
      // column is full
      return -1;
    }

    // column is not full; score all lines
    let lineTypes = {};
    orientations.forEach(([d_r, d_c]) => {
      for (let offset = 0; offset < keyAttributes.lineLen; offset++) {
        // a line goes in direction [d_r, d_c] and is offset in direction [-d_r, -d_c]
        if (inBounds(row, col, offset, d_r, d_c, keyAttributes)) {
          const type = calculateLineType(row, col, offset, d_r, d_c);
          lineTypes[type] = (lineTypes[type] || 0) + 1;
        }
      }
    });
    console.log(lineTypes); // TEMP:

    // given lineTypes, assign a score
    // most lines you can be in is 13 (but the 3 above would be not so helpful)
    if (lineTypes["win"] > 0) {
      // can win here; do it
      return 70;
    } else if (lineTypes["blockWin"] > 0) {
      // opp will win here next turn; must block
      return 60;
    } else if (lineTypes["setup"] > 1) {
      // can setup multiple winning moves for next turn; do it
      return 50;
    } else if (lineTypes["blockSetup"] > 1) {
      // opp can setup multiple winning moves for next turn; must block
      return 40;
    } else {
      // weighted sum of all lines
      // can assume no win nor blockWin; and at most 1 setup / blockSetup each
      return (
        5 * (lineTypes["setup"] || 0) +
        4 * (lineTypes["blockSetup"] || 0) +
        3 * (lineTypes["extend"] || 0) +
        2 * (lineTypes["blockExtend"] || 0) +
        1 * (lineTypes["empty"] || 0) +
        0 * (lineTypes["mixed"] || 0) +
        1 // just to ensure score is positive
      );
    }
  }

  // ...
  function calculateLineType(row, col, offset, d_r, d_c) {
    const myCount = countPiecesInLine(
      row,
      col,
      offset,
      d_r,
      d_c,
      computerIndex,
      keyAttributes
    );
    const theirCount = countPiecesInLine(
      row,
      col,
      offset,
      d_r,
      d_c,
      1 - computerIndex,
      keyAttributes
    );
    switch (2 ** myCount * 3 ** theirCount) {
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
  function getNextMove(moveOptions) {
    // find all indices of the largest score
    let maxVal = -1;
    let indicesOfMax = [];
    moveOptions.forEach((score, ind) => {
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
  function getThinkTime(moveOptions) {
    // find the largest two scores (duplicates are distinct)
    let firstMax = -1;
    let secondMax = -1;
    moveOptions.forEach((score) => {
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
      const moveOptions = getAllScores();
      console.log(moveOptions); // TEMP:
      const col = getNextMove(moveOptions);
      const thinkTime = getThinkTime(moveOptions);
      console.log(thinkTime); // TEMP:

      setTimeout(() => dropInCol(col), thinkTime);
      setPlayNow(false);
    }
  });
}

export { useComputerPlayer };
