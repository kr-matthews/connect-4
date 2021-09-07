import { useReducer } from "react";

import { useGame } from "./useGame.js";

function useRoom(roomID, name, colour) {
  //// States

  // players
  const [players, playersDispatch] = useReducer(playersReducer, [
    { name, colour },
  ]);
  const playerCount = players.length();
  // game results history (W-D-L)
  const [results, resultsDispatch] = useReducer(resultsReducer, {
    win: 0,
    draw: 0,
    lose: 0,
  });

  //// Reducers

  function playersReducer(state, action) {
    switch (action.type) {
      case "reset":
        return [];
      case "add":
        let { name, colour } = action;
        let newState = [...state];
        newState.push({ name, colour });
        return newState;
      case "update":
        let newState = [...state];
        newState[action.player][action.property] = action.value;
        return newState;
      default:
        console.log("playersReducer default switch");
        return state;
    }
  }

  function resultsReducer(state, action) {
    if (action.type === "reset") {
      return { win: 0, draw: 0, lose: 0 };
    }
    let newState = [...state];
    newState[action.type] += 1;
    return newState;
  }

  //// Return

  return [playerCount, players, playersDispatch, results, resultsDispatch];
}
