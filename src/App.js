import { createContext } from "react";

import Header from "./Options/Header.js";
import Lobby from "./Options/Lobby.js";

import PlayerName from "./Options/PlayerName.js";
import PlayerColour from "./Options/PlayerColour.js";
import SiteTheme from "./Options/SiteTheme.js";
import Mute from "./Options/Mute.js";

import CreateRoom from "./Room/CreateRoom.js";
import JoinRoom from "./Room/JoinRoom.js";
import Room from "./Room/Room.js";

import { GlobalStyle } from "./GlobalStyle.js";

import { useLocalState } from "./Options/useLocalState.js";
import { useSound } from "./sounds/useSound.js";
import { useRoomHandlers } from "./Room/useRoomHandlers.js";

// TODO: LATER: option to add time limit to moves
//  careful: game auto starts on second player join

// TODO: LATER: add computer opponent as an option?

//// Contexts

const themes = {
  light: { type: "light", background: "#F5F5F5", foreground: "#121212" },
  dark: { type: "dark", background: "#121212", foreground: "#F5F5F5" },
};
const ThemeContext = createContext(themes.light);
const SoundContext = createContext();

//// Simple Helpers

// unfortunately, colour inputs don't recognize names like "Red"
const colours = [
  "#FF0000", // Red
  "#FF69B4", // HotPink
  "#FF8C00", // DarkOrange
  "#FFD700", // Gold
  "#FF00FF", // Magenta
  "#228B22", // ForestGreen
  "#0000FF", // Blue
  "#8B4513", // SaddleBrown
  "#C0C0C0", // Silver
];
function getRandomColour() {
  return colours[Math.floor(Math.random() * colours.length)];
}

//// App

function App() {
  // Player Properties

  const [name, setName] = useLocalState("name", "Nameless");
  const [colour, setColour] = useLocalState("colour", getRandomColour());

  // Site Properties

  const [theme, setTheme] = useLocalState("theme", themes.light);
  function toggleTheme() {
    setTheme(theme.type === "light" ? themes.dark : themes.light);
  }

  const [soundIsOn, setSoundIsOn] = useLocalState("sound", true);
  function toggleSound() {
    setSoundIsOn(!soundIsOn);
  }
  const { setSoundToPlay } = useSound(soundIsOn);

  // Room handlers

  const {
    roomCode,
    isOwner,
    restartMethod,
    createRoomHandler,
    joinRoomHandler,
    closeRoomHandler,
    leaveRoomHandler,
  } = useRoomHandlers(setSoundToPlay);

  //// Return

  return (
    <ThemeContext.Provider value={theme}>
      <SoundContext.Provider value={{ setSoundToPlay }}>
        <GlobalStyle theme={theme} />
        <Header>
          <PlayerName name={name} setName={setName} />
          <PlayerColour colour={colour} setColour={setColour} />
          <SiteTheme themeType={theme.type} toggleTheme={toggleTheme} />
          <Mute soundIsOn={soundIsOn} toggleSound={toggleSound} />
        </Header>
        <h1>Connect 4 [WIP]</h1>
        {roomCode ? (
          <Room
            player={{ name, colour }}
            isOwner={isOwner}
            roomCode={roomCode}
            restartMethod={restartMethod}
            closeRoomHandler={closeRoomHandler}
            leaveRoomHandler={leaveRoomHandler}
          />
        ) : (
          <Lobby>
            <CreateRoom createRoomHandler={createRoomHandler} />
            <JoinRoom joinRoomHandler={joinRoomHandler} />
          </Lobby>
        )}
      </SoundContext.Provider>
    </ThemeContext.Provider>
    // TODO: COMPONENT: add Links component
  );
}

export default App;

export { ThemeContext, SoundContext };
