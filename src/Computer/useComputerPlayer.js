import { useState, useEffect } from "react";

// only does anything if active, and active never changes while mounted
function useComputerPlayer(active, pieces, computersTurn, dropInCol, forfeit) {
  //// States

  // flag indicating whether a move needs to be made
  const [playNow, setPlayNow] = useState(false);

  //// Helper functions/constants

  // TODO: COMPUTER: calculate thinkTime based on pieces complexity
  const thinkTime = Math.floor(Math.random() * 2000) + 500;

  // TODO: COMPUTER: select next move based on pieces

  //// Effects

  // trigger flag when necessary
  useEffect(() => {
    if (active && computersTurn) {
      setPlayNow(true);
    }
  }, [active, computersTurn]);

  // play when flag is raised
  useEffect(() => {
    if (playNow) {
      const randomCol = Math.floor(Math.random() * 7);
      setTimeout(() => dropInCol(randomCol), thinkTime);
      setPlayNow(false);
    }
  }, [playNow, thinkTime, dropInCol]);
}

export { useComputerPlayer };
