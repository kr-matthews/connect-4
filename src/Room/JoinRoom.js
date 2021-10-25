import { useState } from "react";

function JoinRoom({ joinRoomHandler }) {
  const [roomCodeInput, setRoomCodeInput] = useState("");

  function changeHandler(e) {
    setRoomCodeInput(e.target.value.toUpperCase().trim());
  }

  return (
    <div>
      <h3>Join a Room</h3>
      <p>
        If someone else has given you a code, use that code to join their room.
        Codes are 4 characters.
      </p>
      <form>
        <input
          type="text"
          value={roomCodeInput}
          placeholder="enter room code"
          onChange={changeHandler}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            joinRoomHandler(roomCodeInput);
          }}
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default JoinRoom;
