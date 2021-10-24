function SiteTheme({ themeType, toggleTheme }) {
  return (
    <>
      You're using the <button onClick={toggleTheme}>{themeType}</button> theme.
    </>
  );
}

export default SiteTheme;
