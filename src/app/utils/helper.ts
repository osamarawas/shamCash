export function getStorageTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme;
  }
}
