function CreateMultiPlayer({ playLocally }) {
  function handleClick(e) {
    e.preventDefault();
    playLocally();
  }

  return (
    <div className="option">
      <h3>Local Multi-Player</h3>
      <p>To play a friend on the same screen as you, start a local game.</p>
      <form>
        <button onClick={handleClick}>Play Locally</button>
      </form>
    </div>
  );
}

export default CreateMultiPlayer;
