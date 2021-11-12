import { useState } from "react";

function CreateRoom({ createRoom }) {
  const [restartMethodInput, setRestartMethodInput] = useState("alternate");

  function handleChange(e) {
    setRestartMethodInput(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    createRoom(restartMethodInput);
  }

  return (
    <div className="option">
      <h3>Create an Online Room</h3>
      <p>
        To play a friend remotely, create a room. You'll be given a code to
        share with them.
      </p>
      <div>
        Select who will go first in rematches:
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
          <button onClick={handleClick}>Create Room</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
