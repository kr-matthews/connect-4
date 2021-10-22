function SiteTheme({ themeType, toggleTheme }) {
  return (
    <>
      The theme is <span onClick={toggleTheme}>{themeType}</span>.
    </>
  );
}

export default SiteTheme;
