import ShallowRenderer from "react-test-renderer/shallow";

import Board from "./Board.js";
import { Row, Cell } from "./Board.js";

const positions = [
  [
    { piece: 1, isWinner: false },
    { piece: 0, isWinner: false },
  ],
  [
    { piece: 0, isWinner: false },
    { piece: null, isWinner: false },
  ],
  [
    { piece: null, isWinner: false },
    { piece: null, isWinner: false },
  ],
];

const columns = [{ isFull: true }, { isFull: true }];
const colours = ["red", "blue"];

it("<Board /> renders table properly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Board
      viewer={0}
      positions={positions}
      columns={columns}
      isViewersTurn={true}
      makeMove={jest.fn()}
      colours={colours}
    />
  );
  const result = renderer.getRenderOutput();

  // should render a table
  expect(result.type).toBe("table");
  // table should contain one child, a table body
  expect(result.props.children.type).toBe("tbody");
  // the table body should have a child for each row
  expect(result.props.children.props.children).toHaveLength(positions.length);
  // each of these should be a Row component
  expect(result.props.children.props.children[0].type).toEqual(Row);
});

it("<Row /> renders table row properly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Row
      row={positions[0]}
      columns={columns}
      viewer={0}
      isViewersTurn={false}
      makeMove={jest.fn()}
      colours={colours}
    />
  );
  const result = renderer.getRenderOutput();

  // should render a table row
  expect(result.type).toBe("tr");
  // there should be a child for each cell in the row
  expect(result.props.children).toHaveLength(positions[0].length);
  // each entry should be a Cell component
  expect(result.props.children[0].type).toEqual(Cell);
});

it("<Cell /> renders table cell properly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <Cell
      handleClick={jest.fn()}
      colours={colours}
      useGradient={false}
      isHighlight={true}
      isClickable={false}
    />
  );
  const result = renderer.getRenderOutput();

  // should render a table row
  expect(result.type).toBe("td");
});
