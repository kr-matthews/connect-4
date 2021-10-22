import { useState, createContext } from "react";

import Header from "./Options/Header.js";
import Lobby from "./Options/Lobby.js";
import Room from "./Room/Room.js";

import PlayerName from "./Options/PlayerName.js";
import PlayerColour from "./Options/PlayerColour.js";
import Theme from "./Options/Theme.js";

import CreateRoom from "./Room/CreateRoom.js";
import JoinRoom from "./Room/JoinRoom.js";

//// Page Theme

const themes = {
  light: { type: "light", background: "White", foreground: "Black" },
  dark: { type: "dark", background: "Black", foreground: "White" },
};
const ThemeContext = createContext(themes.dark);

function App() {
  //// Player Attributes/Properties and Theme

  // TODO: LOCAL STORAGE: store name and colour in local storage
  const [name, setName] = useState("Nameless");
  // TODO: INIT VAL: select random colour as  default
  const [colour, setColour] = useState("#0000FF");

  const [theme, setTheme] = useState(themes.dark);
  function toggleTheme() {
    setTheme(theme.type === "light" ? themes.dark : themes.light);
  }

  //// Return

  return (
    <ThemeContext.Provider value={theme}>
      <Header>
        <PlayerName name={name} setName={setName} />
        <PlayerColour colour={colour} setColour={setColour} />
        <Theme themeType={theme.type} toggleTheme={toggleTheme} />
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
    </ThemeContext.Provider>
    // TODO: COMPONENT: add Links component
  );
}

export default App;

export { ThemeContext };
