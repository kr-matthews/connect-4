import Header from "./Header.js";
import Board from "./Board.js";
import Footer from "./Footer.js";

import { useGame } from "./useGame.js";

function Room() {
  // TODO: Room component
  const [
    board,
    gameStatus,
    playNext,
    resetGame,
    moveHistory,
    placePiece,
  ] = useGame();

  return (
    <>
      <h2>Room</h2>
      <Header />
      <Board />
      <Footer />
    </>
  );
}

export default Room;
