export const getTheme = () => {
  if (localStorage.getItem("theme") === null) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return localStorage.getItem("theme");
};
