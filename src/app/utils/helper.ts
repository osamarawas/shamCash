export function getStorageTheme() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  }
}
