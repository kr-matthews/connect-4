function PlayerColour({ colour, setColour }) {
  function changeHandler(e) {
    setColour(e.target.value);
  }

  return (
    <>
      Your piece colour is{" "}
      <input type="color" value={colour} onChange={changeHandler} />.
    </>
  );
}

export default PlayerColour;
