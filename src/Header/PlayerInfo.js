function PlayerInfo({ children, self }) {
  return (
    <>
      <h3>{self ? "You" : "Opponent"}</h3>
      {children}
    </>
  );
}

export default PlayerInfo;
