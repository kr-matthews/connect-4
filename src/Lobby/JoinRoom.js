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
    <div>
      <h3>Join an Online Room</h3>
      <p>
        If someone else has given you a room code, use that code to join their
        room. Room codes are 4 characters.
      </p>
      <form>
        <input
          type="text"
          value={roomCodeInput}
          placeholder="enter room code"
          onChange={changeHandler}
        />
        <button onClick={clickHandler}>Join Room</button>
      </form>
    </div>
  );
}

export default JoinRoom;
