function SiteTheme({ themeType, toggleTheme }) {
  return (
    <>
      You're using the <span onClick={toggleTheme}>{themeType}</span> theme.
    </>
  );
}

export default SiteTheme;
