function Mute({ soundIsOn, toggleSound }) {
  return (
    <>
      Sound is <button onClick={toggleSound}>{soundIsOn ? "on" : "off"}</button>
      .
    </>
  );
}

export default Mute;
