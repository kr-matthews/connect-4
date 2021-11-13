import { useReducer, useEffect, useCallback } from "react";

//// Reducers & initial states

const initialResults = { wins: 0, draws: 0, loses: 0 };

function resultReducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialResults;
    default:
      // win, draw, or lose
      let newState = { ...state };
      newState[action.type + "s"] += 1;
      return newState;
  }
}

//// Hook

function useResults(gameStatus, winner, hasOpponent = true) {
  //// Constants

  const [resultHistory, dispatchResult] = useReducer(
    resultReducer,
    initialResults
  );

  //// Functions

  const resetResults = useCallback(() => {
    dispatchResult({ type: "reset" });
  }, []);

  //// Effects

  // at end of game, update the W-D-L tally
  useEffect(() => {
    if (winner === 0) {
      dispatchResult({ type: "win" });
    } else if (winner === 1) {
      dispatchResult({ type: "lose" });
    }
  }, [winner]);
  useEffect(() => {
    if (gameStatus === "draw") {
      dispatchResult({ type: "draw" });
    }
  }, [gameStatus]);

  // if the opponent leaves, reset
  useEffect(() => {
    if (!hasOpponent) {
      resetResults();
    }
    // resetResults never changes
  }, [hasOpponent, resetResults]);

  //// Return

  return { resultHistory, resetResults };
}

export { useResults };
