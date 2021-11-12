function PlayerInfo({ children, self }) {
  return (
    <div className={"playerInfo headerBlock " + (self ? "self" : "opponent")}>
      <h3>{self ? "You" : "Opponent"}</h3>
      {children}
    </div>
  );
}

export default PlayerInfo;
