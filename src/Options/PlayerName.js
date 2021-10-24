import { useState } from "react";

const defaultName = "Nameless";

function PlayerName({ name, setName }) {
  const [isEditing, setIsEditing] = useState(false);

  // click name to edit it
  function clickHandler() {
    setIsEditing(true);
  }

  // type name; update state
  function changeHandler(e) {
    setName(e.target.value.trim());
  }

  // save/submit via enter...
  function keyDownHandler(e) {
    if (e.key === "Enter") {
      loseFocusHandler();
    }
  }

  // ... or by clicking anywhere outside (losing focus)
  function loseFocusHandler() {
    name === "" && setName(defaultName);
    setIsEditing(false);
  }

  return (
    <>
      Your name is{" "}
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={name}
          placeholder="Name"
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          onBlur={loseFocusHandler}
        />
      ) : (
        <button onClick={clickHandler}>{name}</button>
      )}
      .
    </>
  );
}

export default PlayerName;
