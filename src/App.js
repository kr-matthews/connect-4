import Options from "./Options.js";
import Lobby from "./Lobby.js";
import Room from "./Room.js";

import CreateRoom from "./CreateRoom.js";
import JoinRoom from "./JoinRoom.js";

function App() {
  // TODO: COMPONENT: App
  // TODO: COMPONENT: add Links component
  // TODO: CONTEXT: add context for light/dark theme
  return (
    <>
      <h1>Connect 4 [WIP]</h1>
      <Options />
      {true && (
        <Lobby>
          <CreateRoom createRoomHandler={null} />
          <JoinRoom joinRoomHandler={null} />
        </Lobby>
      )}
      {true && (
        <Room // TEMP: Room params in App
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
