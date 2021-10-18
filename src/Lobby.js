// TODO: UI: improve design/css of lobby (and sub-components)

function Lobby({ children }) {
  return (
    <>
      <h2>Lobby</h2>
      <p>
        Welcome to the Connect 4 lobby. Here, you can create or join a room.
        Rooms are where you can play a game of Connect 4, and can fit up to 2
        players.
      </p>
      {children}
    </>
  );
}

export default Lobby;
