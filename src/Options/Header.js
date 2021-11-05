function Header({ children }) {
  // TODO: UI: styling for Header/options (and all sub-components)

  // TODO: MAYBE: COLOUR: add option to add texture to opponent pieces?
  //  helpful in the event they decdie to always match your colour

  return (
    <div>
      {children.map((child, ind) => {
        return <div key={ind}>{child}</div>;
      })}
    </div>
  );
}

export default Header;
