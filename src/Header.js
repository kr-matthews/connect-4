function Header({ children }) {
  // TODO: UI: styling for Header (options)

  return (
    <div>
      {children.map((child, ind) => {
        return <div key={ind}>{child}</div>;
      })}
    </div>
  );
}

export default Header;
