import ShallowRenderer from "react-test-renderer/shallow";

import Board from "./Board.js";
import { Row, Cell } from "./Board.js";

const board = [
  [
    { player: 1, inLine: false },
    { player: 0, inLine: false },
  ],
  [
    { player: 0, inLine: false },
    { player: null, inLine: false },
  ],
  [
    { player: null, inLine: false },
    { player: null, inLine: false },
  ],
];
const colours = ["red", "blue"];

it("<Board /> renders table properly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Board
      board={board}
      placePiece={jest.fn()}
      colours={colours}
      toPlayNext={0}
    />
  );
  const result = renderer.getRenderOutput();

  // should render a table
  expect(result.type).toBe("table");
  // table should contain one child, a table body
  expect(result.props.children.type).toBe("tbody");
  // the table body should have a child for each row
  expect(result.props.children.props.children).toHaveLength(board.length);
  // each of these should be a Row component
  expect(result.props.children.props.children[0].type).toEqual(Row);
});

it("<Row /> renders table row properly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Row
      row={board[0]}
      placePiece={jest.fn()}
      colours={colours}
      toPlayNext={0}
    />
  );
  const result = renderer.getRenderOutput();

  // should render a table row
  expect(result.type).toBe("tr");
  // there should be a child for each cell in the row
  expect(result.props.children).toHaveLength(board[0].length);
  // each entry should be a Cell component
  expect(result.props.children[0].type).toEqual(Cell);
});

it("<Cell /> renders table cell properly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Cell
      col={2}
      player={1}
      placePiece={jest.fn()}
      colours={colours}
      inLine={false}
      toPlayNext={0}
    />
  );
  const result = renderer.getRenderOutput();

  // should render a table row
  expect(result.type).toBe("td");
});
