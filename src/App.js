import { createContext } from "react";

import Header from "./Options/Header.js";
import Lobby from "./Options/Lobby.js";

import PlayerName from "./Options/PlayerName.js";
import PlayerColour from "./Options/PlayerColour.js";
import SiteTheme from "./Options/SiteTheme.js";

import CreateRoom from "./Room/CreateRoom.js";
import JoinRoom from "./Room/JoinRoom.js";
import Room from "./Room/Room.js";

import { useLocalState } from "./useLocalState.js";
import { GlobalStyle } from "./GlobalStyle.js";

//// Page Theme

const themes = {
  light: { type: "light", background: "#F5F5F5", foreground: "#121212" },
  dark: { type: "dark", background: "#121212", foreground: "#F5F5F5" },
};
const ThemeContext = createContext(themes.light);

//// App

function App() {
  //// Player Attributes/Properties and Theme

  const [name, setName] = useLocalState("name", "Nameless");
  // TODO: INIT VAL: select random colour as  default
  const [colour, setColour] = useLocalState("colour", "#0000FF");

  const [theme, setTheme] = useLocalState("theme", themes.light);
  function toggleTheme() {
    setTheme(theme.type === "light" ? themes.dark : themes.light);
  }

  //// Return

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalStyle theme={theme} />
      <Header>
        <PlayerName name={name} setName={setName} />
        <PlayerColour colour={colour} setColour={setColour} />
        <SiteTheme themeType={theme.type} toggleTheme={toggleTheme} />
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
