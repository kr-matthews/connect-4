function CreateSinglePlayer({ playComputer }) {
  function handleClick(e) {
    e.preventDefault();
    playComputer();
  }

  return (
    <div className="option">
      <h3>Play Computer</h3>
      <p>
        If you don't have a friend to play against, there is a computer opponent
        available.
      </p>
      <form>
        <button onClick={handleClick}>Play Computer</button>
      </form>
    </div>
  );
}

export default CreateSinglePlayer;
