function PlayerInfo({ children, self }) {
  return (
    <>
      <h2>{self ? "You" : "Opponent"}</h2>
      {children}
    </>
  );
}

export default PlayerInfo;
