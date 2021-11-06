import { useState, useMemo, createContext } from "react";

// TODO: NEXT: NETWORK: deal with potential failures of pubnub

import PubNub from "pubnub";
// pubnubKeys.js is listed in .gitignore, contains private keys
import { subscribeKey, publishKey } from "./pubnubKeys.js";

import Header from "./Header/Header.js";
import PlayerInfo from "./Header/PlayerInfo.js";
import PlayerName from "./Header/PlayerName.js";
import PlayerColour from "./Header/PlayerColour.js";
import SiteTheme from "./Header/SiteTheme.js";
import SiteSound from "./Header/SiteSound.js";

import Lobby from "./Lobby/Lobby.js";
import Room from "./Room/Room.js";
import LocalPlay from "./Local/LocalPlay.js";
import ComputerPlay from "./Local/ComputerPlay.js";

import Links from "./links/Links.js";

import { GlobalStyle } from "./GlobalStyle.js";

import { useLocalState } from "./useLocalState.js";
import { useSound } from "./sounds/useSound.js";

import { getRandomColour } from "./Colours.js";

//// Contexts

const themes = {
  light: { type: "light", background: "#F5F5F5", foreground: "#121212" },
  dark: { type: "dark", background: "#121212", foreground: "#F5F5F5" },
};
const ThemeContext = createContext(themes.light);
const SoundContext = createContext();

//// Simple Helpers

function generateRandomUuid() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uuid = "";
  for (let i = 0; i < 64; i++) {
    uuid += chars[Math.floor(Math.random() * chars.length)];
  }
  return uuid;
}

//// App

function App() {
  //// States and setters/toggles

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

  // Player Properties

  const [name, setName] = useLocalState("name", "Nameless");
  const [colour, setColour] = useLocalState("colour", getRandomColour());

  // Opponent Properties

  // other player's name and colour, once they join\
  const [opponent, setOpponent] = useState(null);
  function modifyOpponent(key, val) {
    setOpponent((prev) => {
      if (prev) {
        const copy = { ...prev };
        copy[key] = val;
        return copy;
      }
    });
  }

  // indicator for which type of gameplay is being used

  // indicates online, local, or computer (or null if in lobby)
  const [playType, setPlayType] = useState(null);

  // exit whatever mode of play you're in
  function resetAll() {
    // exit & clear opponent
    setPlayType(null);
    setOpponent(null);
    // cleanup room, if applicable
    setRoomCode(null);
    setIsOwner(null);
    setRestartMethod(null);
  }
  // room and network params, shared between lobby and room

  const [roomCode, setRoomCode] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [restartMethod, setRestartMethod] = useState(null);

  // constant identifier per user/device
  const [uuid] = useLocalState("uuid", generateRandomUuid());
  // pubnub network
  const pubnub = useMemo(() => new PubNub({ publishKey, subscribeKey, uuid }), [
    uuid,
  ]);

  //// Return

  return (
    <ThemeContext.Provider value={theme}>
      <SoundContext.Provider value={{ setSoundToPlay }}>
        <GlobalStyle theme={theme} />

        <h1>Connect 4</h1>

        <Header>
          <PlayerInfo self={true}>
            <PlayerName editable={true} name={name} setName={setName} />
            <PlayerColour
              editable={true}
              colour={colour}
              setColour={setColour}
            />
          </PlayerInfo>

          <SiteTheme themeType={theme.type} toggleTheme={toggleTheme} />
          <SiteSound soundIsOn={soundIsOn} toggleSound={toggleSound} />

          {opponent && (
            <PlayerInfo self={false}>
              <PlayerName
                editable={playType === "local"}
                name={opponent.name}
                setName={(name) => modifyOpponent("name", name)}
              />
              <PlayerColour
                editable={playType === "local" || playType === "computer"}
                colour={opponent.colour}
                setColour={(colour) => modifyOpponent("colour", colour)}
              />
            </PlayerInfo>
          )}
        </Header>

        {playType === "online" ? (
          <Room
            roomCode={roomCode}
            player={{ name, colour, uuid }}
            isOwner={isOwner}
            opponent={opponent}
            setOpponent={setOpponent}
            initialRestartMethod={restartMethod}
            unmountRoom={resetAll}
            pubnub={pubnub}
          />
        ) : playType === "local" ? (
          <LocalPlay
            player={{ name, colour }}
            opponent={opponent}
            unmountLocal={resetAll}
          />
        ) : playType === "computer" ? (
          <ComputerPlay
            player={{ name, colour }}
            opponent={opponent}
            unmountComputer={resetAll}
          />
        ) : (
          <Lobby
            setOpponent={setOpponent}
            setPlayType={setPlayType}
            setRoomCode={setRoomCode}
            setIsOwner={setIsOwner}
            setRestartMethod={setRestartMethod}
            pubnub={pubnub}
          />
        )}
        <Links
          gitHubLink="https://github.com/kr-matthews/connect-4"
          themeType={theme.type}
        />
      </SoundContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

export { ThemeContext, SoundContext };
