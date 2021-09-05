import Options from "./Options.js";
import Lobby from "./Lobby.js";
import Room from "./Room.js";

function App() {
  // TODO: add Links component
  return (
    <>
      <h1>Connect 4 [WIP]</h1>
      <Options />
      {true && <Lobby />}
      {true && <Room />}
    </>
  );
}

export default App;
