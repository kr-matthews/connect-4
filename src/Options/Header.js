function Header({ children }) {
  // TODO: UI: styling for Header/options (and all sub-components)

  return (
    <div>
      {children.map((child, ind) => {
        return <div key={ind}>{child}</div>;
      })}
    </div>
  );
}

export default Header;
