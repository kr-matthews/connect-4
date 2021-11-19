import { useState, useEffect } from "react";

// fiddle around with these parameters
const worstThinkTime = 2500;
const randomFactor = Math.floor(Math.random() * 500) - 250;
const minThinkTime = 150;

// only does anything if active, and active never changes while mounted
function useComputerPlayer(active, pieces, computersTurn, dropInCol, forfeit) {
  //// States

  // flag indicating whether a move needs to be made
  const [playNow, setPlayNow] = useState(false);

  //// Helper functions/constants

  // return array with ith spot being score for playing in col i
  function getMoveOptions(pieces) {
    let moveOptions = [];
    for (let col = 0; col < pieces[0].length; col++) {
      moveOptions.push(calculateScore(col, pieces));
    }
    console.log(moveOptions); // TEMP:
    return moveOptions;
  }

  // -1 for invalid play, otherwise a non-negative score
  function calculateScore(col, pieces) {
    if (pieces[pieces.length - 1][col] !== null) {
      // column is full
      return -1;
    }

    // column is not full; score all lines
    return Math.floor(Math.random() * 10);
    // TODO: NEXT: proper definition of calculateScore
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
    } else if (firstMax === 0) {
      // TODO: not yet sure if all valid scores can be zero
      return 2 * minThinkTime;
    }
    // otherwise, top two plays are valid and can look at ratio between 0 and 1
    const ratio = secondMax / firstMax;
    // the larger the fraction, the longer the move should take
    return Math.max(minThinkTime, worstThinkTime * ratio + randomFactor);
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
      const moveOptions = getMoveOptions(pieces);
      const col = getNextMove(moveOptions);
      const thinkTime = getThinkTime(moveOptions);
      setTimeout(() => dropInCol(col), thinkTime);
      setPlayNow(false);
    }
  });
}

export { useComputerPlayer };
