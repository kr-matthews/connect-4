function CreateMultiPlayer({ playLocally }) {
  function handleClick(e) {
    e.preventDefault();
    playLocally();
  }

  return (
    <div>
      <h3>Local Multi-Player</h3>
      <p>
        If you have someone using the same screen as you, play against them
        locally.
      </p>
      <form>
        <button onClick={handleClick}>Play Locally</button>
      </form>
    </div>
  );
}

export default CreateMultiPlayer;
