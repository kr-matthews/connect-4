import { useState } from "react";

function PlayerName({ name, setName }) {
  const [isEditing, setIsEditing] = useState(false);

  function changeHandler(e) {
    setName(e.target.value.trim());
  }

  // TODO: CLEAN-UP: repeated code; pass in defaultName and isValidName as params?

  function keyDownHandler(e) {
    if (e.key === "Enter") {
      name === "" && setName("Nameless");
      setIsEditing(false);
    }
  }

  function loseFocusHandler(e) {
    name === "" && setName("Nameless");
    setIsEditing(false);
  }

  function clickHandler() {
    setIsEditing(true);
  }

  // TODO: UI: style PlayerName; change cursor on hover; auto-focus on click, submit off of focus

  return (
    <>
      Your name is{" "}
      {isEditing ? (
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          onBlur={loseFocusHandler}
        />
      ) : (
        <span onClick={clickHandler}>{name}</span>
      )}
      .
    </>
  );
}

export default PlayerName;
