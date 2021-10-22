import { useState } from "react";

import Header from "./Options/Header.js";
import Lobby from "./Options/Lobby.js";
import Room from "./Room/Room.js";

import PlayerName from "./Options/PlayerName.js";
import PlayerColour from "./Options/PlayerColour.js";
import Theme from "./Options/Theme.js";

import CreateRoom from "./Room/CreateRoom.js";
import JoinRoom from "./Room/JoinRoom.js";

function App() {
  // TODO: COMPONENT: App
  // TODO: CONTEXT: add context for light/dark theme

  // Player Attributes/Properties

  // TODO: LOCAL STORAGE: store name and colour in local storage
  const [name, setName] = useState("Nameless");
  // TODO: INIT VAL: select random colour as  default
  const [colour, setColour] = useState("#0000FF");

  return (
    <>
      <Header>
        <PlayerName name={name} setName={setName} />
        <PlayerColour colour={colour} setColour={setColour} />
        <Theme />
      </Header>
      <h1>Connect 4 [WIP]</h1>
      {true && (
        <Lobby // TEMP: Lobby params in App
        >
          <CreateRoom createRoomHandler={null} />
          <JoinRoom joinRoomHandler={null} />
        </Lobby>
      )}
      {true && (
        <Room // TEMP: Room params in App
          player={{ name, colour }}
          isOwner={true}
          roomId="2134676543"
          restartMethod="alternate"
          closeRoomHandler={null}
        />
      )}
    </>
    // TODO: COMPONENT: add Links component
  );
}

export default App;
