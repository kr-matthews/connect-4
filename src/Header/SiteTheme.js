function SiteTheme({ themeType, toggleTheme }) {
  return (
    <div>
      You're using the <button onClick={toggleTheme}>{themeType}</button> theme.
    </div>
  );
}

export default SiteTheme;
