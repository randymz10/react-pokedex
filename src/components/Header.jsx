import React, { useEffect } from "react";
import { usePokemonStore } from "../store/pokemonStore";

import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
import { Link } from "react-router";

function Header() {
  const theme = usePokemonStore((state) => state.theme);
  const updateTheme = usePokemonStore((state) => state.updateTheme);

  useEffect(
    function () {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    },
    [theme]
  );

  function handleTheme() {
    if (theme === "light") {
      updateTheme("dark");
      return;
    }
    updateTheme("light");
  }
  return (
    <header className="">
      <div className="is-flex is-justify-content-flex-end">
        <button className="button" onClick={handleTheme}>
          <span className="icon">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </span>
        </button>
      </div>
      <div className="has-text-centered mt-6 mb-3">
        <h1 className="title is-1 is-uppercase ">
          <Link to='/'>Pokedéx</Link>
        </h1>
        <p className="subtitle is-6">
          Your Ultimate Pokémon Guide: Stats, Evolutions, and More!
        </p>
      </div>
    </header>
  );
}

export default Header;
