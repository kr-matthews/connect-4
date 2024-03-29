import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  createContext,
} from "react";
import {
  WithHeavyFooter,
  Body,
  HeavyFooter,
  HomeLink,
  CodeLink,
} from "footer-dependency/dist/lib";

import PubNub from "pubnub";
// pubnubKeys.js is listed in .gitignore, contains private keys
import { subscribeKey, publishKey } from "./pubnubKeys.js";

import Header from "./Header/Header.js";

import PlayerInfo from "./Header/PlayerInfo.js";
import PlayerName from "./Header/PlayerName.js";
import PlayerColour from "./Header/PlayerColour.js";

import Options from "./Header/Options.js";
import PieceGradients from "./Header/PieceGradients.js";
import SiteTheme from "./Header/SiteTheme.js";
import SiteSound from "./Header/SiteSound.js";

import Lobby from "./Lobby/Lobby.js";
import RemotePlay from "./Remote/RemotePlay.js";
import LocalPlay from "./Local/LocalPlay.js";

import { useLocalState } from "./useLocalState.js";
import { useSound } from "./sounds/useSound.js";

import { getRandomColour } from "./Colours.js";

//// Contexts

const themes = {
  light: { type: "light", background: "#F5F5F5", foreground: "#121212" },
  dark: { type: "dark", background: "#121212", foreground: "#F5F5F5" },
};
const GradientContext = createContext("all");
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
  // for applying transition properties to body after initial load
  const [themeToggled, setThemeToggled] = useState(null);

  function toggleTheme() {
    setTheme(theme.type === "light" ? themes.dark : themes.light);
    setThemeToggled(true);
  }

  const [usingGradient, setUsingGradient] = useLocalState("gradients", "all");
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
  const resetAll = useCallback(() => {
    // exit & clear opponent
    setPlayType(null);
    setOpponent(null);
    // cleanup room, if applicable
    setRoomCode(null);
    setIsOwner(null);
    setRestartMethod(null);
  }, []);
  // room and network params, shared between lobby and room

  const [roomCode, setRoomCode] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [restartMethod, setRestartMethod] = useState(null);

  // constant identifier per user/device
  const [uuid] = useLocalState("uuid", generateRandomUuid());
  // pubnub network
  const network = useMemo(
    () => new PubNub({ publishKey, subscribeKey, uuid }),
    [uuid]
  );

  //// Theme handling

  // set body css properties
  document.body.style.background = theme.background;
  document.body.style.color = theme.foreground;

  // after initial load, introduce transition on theme change
  useEffect(() => {
    document.body.style.transition = "all 0.75s ease-in";
    document.body.style.transitionProperty = "background, color";

    return () => {
      document.body.style.transition = "none";
      document.body.style.transitionProperty = "none";
    };
  }, [themeToggled]);

  //// Return

  return (
    <GradientContext.Provider value={usingGradient}>
      <ThemeContext.Provider value={theme}>
        <SoundContext.Provider value={{ setSoundToPlay }}>
          <WithHeavyFooter>
            <Body>
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

                <Options>
                  <PieceGradients
                    usingGradient={usingGradient}
                    setUsingGradient={setUsingGradient}
                  />
                  <SiteSound soundIsOn={soundIsOn} toggleSound={toggleSound} />
                  <SiteTheme themeType={theme.type} toggleTheme={toggleTheme} />
                </Options>

                {opponent ? (
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
                ) : (
                  <PlayerInfo self={false} />
                )}
              </Header>

              {playType === "online" ? (
                <RemotePlay
                  roomCode={roomCode}
                  player={{ name, colour, uuid }}
                  isOwner={isOwner}
                  opponent={opponent}
                  setOpponent={setOpponent}
                  restartMethod={restartMethod}
                  setRestartMethod={setRestartMethod}
                  unmountRoom={resetAll}
                  network={network}
                />
              ) : playType === "local" ? (
                <LocalPlay
                  sharingScreen={true}
                  player={{ name, colour }}
                  opponent={opponent}
                  unmount={resetAll}
                />
              ) : playType === "computer" ? (
                <LocalPlay
                  sharingScreen={false}
                  player={{ name, colour }}
                  opponent={opponent}
                  unmount={resetAll}
                />
              ) : (
                <Lobby
                  setOpponent={setOpponent}
                  setPlayType={setPlayType}
                  setRoomCode={setRoomCode}
                  setIsOwner={setIsOwner}
                  setRestartMethod={setRestartMethod}
                  network={network}
                />
              )}
            </Body>

            <HeavyFooter>
              <HomeLink />
              <CodeLink gitHubRepoName="connect-4" themeType={theme.type} />
            </HeavyFooter>
          </WithHeavyFooter>
        </SoundContext.Provider>
      </ThemeContext.Provider>
    </GradientContext.Provider>
  );
}

export default App;

export { GradientContext, ThemeContext, SoundContext };
