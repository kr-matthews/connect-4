function SiteTheme({ themeType, toggleTheme }) {
  return (
    <div>
      Using the <button onClick={toggleTheme}>{themeType}</button> theme.
    </div>
  );
}

export default SiteTheme;
