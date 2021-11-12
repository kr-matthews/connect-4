function PlayerColour({ editable, colour, setColour }) {
  function changeHandler(e) {
    const newColour = e.target.value;
    setColour(newColour);
  }

  return (
    <div>
      Colour:{" "}
      {editable ? (
        <input type="color" value={colour} onChange={changeHandler} />
      ) : (
        <input type="color" disabled value={colour} />
      )}
    </div>
  );
}

export default PlayerColour;
