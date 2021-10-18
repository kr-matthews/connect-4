import { useState } from "react";

function JoinRoom({ joinRoomHandler }) {
  // input state and handler
  const [code, setCode] = useState("");
  function changeHandler(e) {
    setCode(e.target.value.toUpperCase().trim());
  }

  return (
    <div>
      <h3>Join a Room</h3>
      <p>
        If someone else has given you a code, use that code to join their room.
      </p>
      <form>
        <input
          type="text"
          value={code}
          placeholder="enter room code"
          onChange={(e) => changeHandler(e)}
        />
        <button onClick={() => joinRoomHandler(code)}>Join</button>
      </form>
    </div>
  );
}

export default JoinRoom;
