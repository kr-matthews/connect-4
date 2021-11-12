import { useState } from "react";

const defaultName = "Nameless";

function PlayerName({ editable, name, setName }) {
  const [isEditing, setIsEditing] = useState(false);

  // click name to edit it
  function clickHandler() {
    setIsEditing(true);
  }

  // type name; update state
  function changeHandler(e) {
    // max valid length of 20
    if (e.target.value.length <= 20) {
      setName(e.target.value);
    }
  }

  // save/submit via enter...
  function keyDownHandler(e) {
    if (e.key === "Enter") {
      loseFocusHandler();
    }
  }

  // ... or by clicking anywhere outside (losing focus)
  function loseFocusHandler() {
    const newName = name === "" ? defaultName : name.trim();
    setName(newName);
    setIsEditing(false);
  }

  return (
    <div>
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
      ) : editable ? (
        <button onClick={clickHandler}>{name}</button>
      ) : (
        name
      )}
    </div>
  );
}

export default PlayerName;
