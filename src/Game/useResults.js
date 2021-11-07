import { useReducer, useEffect } from "react";

//// Reducers & initial states

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

const initialResults = { wins: 0, draws: 0, loses: 0 };

//// Hook

function useResults(gameStatus, winner, playerCount = 2) {
  const [resultHistory, dispatchResult] = useReducer(
    resultReducer,
    initialResults
  );

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

  // if opponent leaves, reset the W-D-L record
  useEffect(() => {
    if (playerCount === 1) {
      dispatchResult({ type: "reset" });
    }
  }, [playerCount]);

  return { resultHistory };
}

export { useResults };
