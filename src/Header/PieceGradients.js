function PieceGradients({ usingGradient, setUsingGradient }) {
  function handleChange(e) {
    setUsingGradient(e.target.value);
  }

  return (
    <div>
      Add a colour gradient to{" "}
      <select value={usingGradient.toString()} onChange={handleChange}>
        <option value="all">all</option>
        <option value="my">my</option>
        <option value="their">their</option>
        <option value="no">no</option>
      </select>{" "}
      pieces.
    </div>
  );
}

export default PieceGradients;
