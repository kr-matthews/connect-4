function LocalHeader({ unmountLocal }) {
  return (
    <>
      <p>You're playing locally with a friend on the same screen.</p>
      <button onClick={unmountLocal}>Return to Lobby</button>
    </>
  );
}

export default LocalHeader;
