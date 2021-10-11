import { useState } from "react";

function useResults() {
  //// States

  const [wins, setWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [loses, setLoses] = useState(0);

  // TODO: NEXT: this, or an object with useReducer?

  //// Return

  return {};
}

export { useResults };
