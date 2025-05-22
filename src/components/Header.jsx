import React, { useEffect } from "react";
import { usePokemonStore } from "../store/pokemonStore";

import { FaHeart, FaHouseChimney, FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
import { Link, NavLink } from "react-router";

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
    <header>
      <div className="is-flex is-justify-content-flex-end">
        <button className="button" onClick={handleTheme}>
          <span className="icon">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </span>
        </button>
      </div>
      <div className="has-text-centered mt-6 mb-3">
        <h1 className="title is-1 is-uppercase ">
          <Link className="title is-1" to="/">
            Pokedéx
          </Link>
        </h1>
        <p className="subtitle is-6">
          Your Ultimate Pokémon Guide: Stats, Evolutions, and More!
        </p>
      </div>
      <nav className="navbar is-flex is-justify-content-center">
        <NavLink className="navbar-item" to="/">
          <span className="icon-text">
            <span className="icon">
              <FaHouseChimney />
            </span>
            <span>Home</span>
          </span>
        </NavLink>
        <NavLink className="navbar-item" to="/favorites">
          <span className="icon-text">
            <span className="icon">
              <FaHeart />
            </span>
            <span>Favorites</span>
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
