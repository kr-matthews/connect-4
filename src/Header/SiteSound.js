function SiteSound({ soundIsOn, toggleSound }) {
  return (
    <div>
      Sound is <button onClick={toggleSound}>{soundIsOn ? "on" : "off"}</button>
      .
    </div>
  );
}

export default SiteSound;
