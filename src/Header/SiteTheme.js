function SiteTheme({ themeType, toggleTheme }) {
  const capitalizedTheme =
    themeType.charAt(0).toUpperCase() + themeType.slice(1);

  return (
    <div>
      <button onClick={toggleTheme}>{capitalizedTheme}</button> theme.
    </div>
  );
}

export default SiteTheme;
