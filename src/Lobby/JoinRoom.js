import { useState } from "react";

function JoinRoom({ joinRoom }) {
  const [roomCodeInput, setRoomCodeInput] = useState("");

  function changeHandler(e) {
    setRoomCodeInput(e.target.value.toUpperCase().trim());
  }

  function clickHandler(e) {
    e.preventDefault();
    if (roomCodeInput) {
      joinRoom(roomCodeInput);
    }
  }

  return (
    <div className="option">
      <h3>Join an Online Room</h3>
      <p>
        If a friend has given you a room code, use that code to join their room.
      </p>
      <div>
        Enter 4-character room code:
        <form>
          <input
            type="text"
            value={roomCodeInput}
            placeholder="paste room code"
            onChange={changeHandler}
          />
          <br />
          <button onClick={clickHandler}>Join Room</button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
