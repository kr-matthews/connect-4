function Footer({ resetGame }) {
  // TODO: Footer component
  return (
    <>
      <p>Footer: game status (onging/lost/etc), game reset options.</p>
      <button onClick={() => resetGame(0)}>Reset Game</button>
    </>
  );
}

export default Footer;
