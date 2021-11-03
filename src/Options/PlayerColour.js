function PlayerColour({ colour, setColour }) {
  function changeHandler(e) {
    const newColour = e.target.value;
    setColour(newColour);
  }

  return (
    <>
      Your piece colour is{" "}
      <input type="color" value={colour} onChange={changeHandler} />.
    </>
  );
}

export default PlayerColour;
