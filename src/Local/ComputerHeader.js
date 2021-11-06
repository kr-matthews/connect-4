function ComputerHeader({ unmountLocal }) {
  return (
    <>
      <p>You're playing against the computer.</p>
      <button onClick={unmountLocal}>Return to Lobby</button>
    </>
  );
}

export default ComputerHeader;
