function Mute({ soundIsOn, setSoundIsOn }) {
  function toggleSoundIsOn() {
    setSoundIsOn((soundIsOn) => !soundIsOn);
  }
  return (
    <>
      Sound is{" "}
      <button onClick={toggleSoundIsOn}>{soundIsOn ? "on" : "off"}</button>.
    </>
  );
}

export default Mute;
