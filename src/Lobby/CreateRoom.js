import { useState } from "react";

function CreateRoom({ createRoom }) {
  const [restartMethodInput, setRestartMethodInput] = useState("alternate");

  function handleChange(e) {
    setRestartMethodInput(e.target.value);
  }

  return (
    <div>
      <h3>Create a Room</h3>
      <p>
        Once created, you will be given a room code which you can share with a
        friend to join.
      </p>
      <p>
        The first player of the first game will be selected randomly. Select who
        will go first in subsequent games.
      </p>
      <form>
        {["Alternate", "Loser", "Winner", "Random"].map((method) => {
          return (
            <label key={method}>
              <input
                type="radio"
                value={method.toLowerCase()}
                checked={restartMethodInput === method.toLowerCase()}
                onChange={handleChange}
              />
              {method}
            </label>
          );
        })}
        <button
          onClick={(e) => {
            e.preventDefault();
            createRoom(restartMethodInput);
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
