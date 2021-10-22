function PlayerColour({ colour, setColour }) {
  function changeHandler(e) {
    setColour(e.target.value);
  }

  // TODO: UI: styling for PlayerColour

  return (
    <>
      Your piece colour is{" "}
      <input type="color" value={colour} onChange={changeHandler} />.
    </>
  );
}

export default PlayerColour;
