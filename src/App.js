import Options from "./Options.js";
import Lobby from "./Lobby.js";
import Room from "./Room.js";

function App() {
  // TODO: add Links component
  // TODO: NEXT: add context for light/dark theme
  return (
    <>
      <h1>Connect 4 [WIP]</h1>
      <Options />
      {true && <Lobby />}
      {/* TEMP: parameters */}
      {true && (
        <Room
          player={{ name: "Alice", colour: "Blue" }}
          isOwner={true}
          roomId="2134676543"
          restartMethod="alternate"
          closeRoomHandler={null}
        />
      )}
    </>
  );
}

export default App;
