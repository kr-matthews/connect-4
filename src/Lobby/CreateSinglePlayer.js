function CreateSinglePlayer({ playComputer }) {
  function handleClick(e) {
    e.preventDefault();
    playComputer();
  }

  return (
    <div>
      <h3>Play Computer Locally</h3>
      <p>
        If you don't have anyone to play against, there is a computer opponent
        available.
      </p>
      <form>
        <button onClick={handleClick}>Play Computer</button>
      </form>
    </div>
  );
}

export default CreateSinglePlayer;
