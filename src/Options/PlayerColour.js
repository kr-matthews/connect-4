function PlayerColour({ colour, setColour, publishColour }) {
  function changeHandler(e) {
    const newColour = e.target.value;
    setColour(newColour);
    publishColour(newColour);
  }

  return (
    <>
      Your piece colour is{" "}
      <input type="color" value={colour} onChange={changeHandler} />.
    </>
  );
}

export default PlayerColour;
