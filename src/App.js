import { useMemo, createContext } from "react";

import PubNub from "pubnub";
// pubnubKeys.js is listed in .gitignore, contains private keys
import { subscribeKey, publishKey } from "./pubnubKeys.js";
import { PubNubProvider } from "pubnub-react";

import Header from "./Options/Header.js";
import Lobby from "./Options/Lobby.js";

import PlayerName from "./Options/PlayerName.js";
import PlayerColour from "./Options/PlayerColour.js";
import SiteTheme from "./Options/SiteTheme.js";
import Mute from "./Options/Mute.js";

import CreateRoom from "./Room/CreateRoom.js";
import JoinRoom from "./Room/JoinRoom.js";
import Room from "./Room/Room.js";

import Links from "./links/Links.js";

import { GlobalStyle } from "./GlobalStyle.js";

import { useLocalState } from "./Options/useLocalState.js";
import { useSound } from "./sounds/useSound.js";
import { useRoomHandlers } from "./Room/useRoomHandlers.js";

import { getRandomColour } from "./Colours.js";

// TODO: DEPLOY: KEYSET: revisit keyset privacy & github pages

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

  //// PubNub network setup
  // TODO: NETWORK: refactor network code as necessary

  // constant identifier per user/device
  const [uuid] = useLocalState("uuid", generateRandomUuid());
  // NOTE: DEPLOY: currently uses demo keys
  const pubnub = useMemo(() => new PubNub({ publishKey, subscribeKey, uuid }), [
    uuid,
  ]);

  // TODO: NETWORK: publish name/colour updates belong in Room?

  const player = { name, colour, uuid };

  function publishName(name) {
    if (roomCode) {
      pubnub.publish({
        message: { type: "name", name, uuid },
        channel: roomCode,
      });
    }
  }

  function publishColour(colour) {
    if (roomCode) {
      pubnub.publish({
        message: { type: "colour", colour, uuid },
        channel: roomCode,
      });
    }
  }

  //// Room handlers

  const {
    roomCode,
    isOwner,
    restartMethod,
    createRoomHandler,
    joinRoomHandler,
    closeRoomHandler,
    leaveRoomHandler,
  } = useRoomHandlers(setSoundToPlay, pubnub, player);

  //// Return

  return (
    <ThemeContext.Provider value={theme}>
      <SoundContext.Provider value={{ setSoundToPlay }}>
        <PubNubProvider client={pubnub}>
          <GlobalStyle theme={theme} />
          <Header>
            <PlayerName
              name={name}
              setName={setName}
              publishName={publishName}
            />
            <PlayerColour
              colour={colour}
              setColour={setColour}
              publishColour={publishColour}
            />
            <SiteTheme themeType={theme.type} toggleTheme={toggleTheme} />
            <Mute soundIsOn={soundIsOn} toggleSound={toggleSound} />
          </Header>
          <h1>Connect 4 [WIP]</h1>
          {roomCode ? (
            <Room
              player={{ name, colour, uuid }}
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
          <Links
            gitHubLink="https://github.com/kr-matthews/connect-4"
            themeType={theme.type}
          />
        </PubNubProvider>
      </SoundContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

export { ThemeContext, SoundContext };
