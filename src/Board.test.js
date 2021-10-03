import ShallowRenderer from "react-test-renderer/shallow";

import Board from "./Board.js";

const board = [
  [{ player: 1 }, { player: 0 }],
  [{ player: 0 }, { player: null }],
  [{ player: null }, { player: null }],
];
const colours = ["red", "blue"];

// QUESTION: is this test written correctly?

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Board board={board} placePiece={() => {}} colours={colours} />
  );
  //const result = renderer.getRenderOutput();
});
