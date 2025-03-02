export const getTheme = () => {
  if (localStorage.getItem("theme") === null) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return localStorage.getItem("theme");
};

export function formatPokemonId(id) {
  if (!id) return;
  return `#${id.toString().padStart(3, "0")}`;
}
