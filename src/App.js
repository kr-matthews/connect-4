import { useState, createContext } from "react";

import Header from "./Options/Header.js";
import Lobby from "./Options/Lobby.js";

import PlayerName from "./Options/PlayerName.js";
import PlayerColour from "./Options/PlayerColour.js";
import SiteTheme from "./Options/SiteTheme.js";
import Mute from "./Options/Mute.js";

import CreateRoom from "./Room/CreateRoom.js";
import JoinRoom from "./Room/JoinRoom.js";
import Room from "./Room/Room.js";

import { useLocalState } from "./useLocalState.js";
import { useSound } from "./sounds/useSound.js";
import { GlobalStyle } from "./GlobalStyle.js";

import createRoomSound from "./sounds/success-1-6297.mp3";
import closeRoomSound from "./sounds/power-down-7103.mp3";
import joinRoomSound from "./sounds/good-6081.mp3";
import leaveRoomSound from "./sounds/notification-sound-7062.mp3";

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

function generateUnusedRoomCode() {
  // omit 0/O, 1/I/L just in case
  const chars = "ABCDEFGHJKMNPQRSTUVXYZ23456789";

  // loop: generate 4-digit code, check whether it is in use, if not then use
  let roomCode = "";
  do {
    roomCode = "";
    for (let i = 0; i < 4; i++) {
      roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (isRoomCodeInUse(roomCode));
  return roomCode;
}

function isRoomCodeInUse(roomCode) {
  // TODO: NETWORK: check network for this code
  return roomCode === "KNKT"; // TEMP: always say room code doesn't exist
}

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

  // TODO: NEXT: these 3 consts and 5 functions should probably be a hook?
  const [roomCode, setRoomCode] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [restartMethod, setRestartMethod] = useState("alternate");

  // many of these functions need to send out messages

  function createRoomHandler(restartMethodInput) {
    // randomly generate room code (make sure it doesn't already exist)
    // take in restartMethod and pass to Room
    setRoomCode(generateUnusedRoomCode());
    setIsOwner(true);
    setRestartMethod(restartMethodInput);
    setSoundToPlay(createRoomSound);
  }

  // TODO: NETWORK: these three handlers need to notify the network

  function joinRoomHandler(roomCodeInput) {
    if (isRoomCodeInUse(roomCodeInput)) {
      setRoomCode(roomCodeInput);
      setIsOwner(false);
      setSoundToPlay(joinRoomSound);
    } else {
      alert("No room with code " + roomCodeInput + " exists.");
    }
  }

  function closeRoomHandler() {
    setRoomCode(null);
    setIsOwner(null);
    setSoundToPlay(closeRoomSound);
  }

  function leaveRoomHandler() {
    setRoomCode(null);
    setIsOwner(null);
    setRestartMethod("alternate");
    setSoundToPlay(leaveRoomSound);
  }

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
