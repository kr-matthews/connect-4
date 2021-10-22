function Header({ children }) {
  // TODO: UI: styling for Header (options)

  // TODO: LATER: allow user to clear local storage via localStorage.clear()

  return (
    <div>
      {children.map((child, ind) => {
        return <div key={ind}>{child}</div>;
      })}
    </div>
  );
}

export default Header;
