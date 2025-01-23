import React from "react";
import PropTypes from "prop-types";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

function Header({ theme, onToggleTheme }) {
  return (
    <header className="">
      <div className="is-flex is-justify-content-flex-end">
        <button className="button" onClick={onToggleTheme}>
          <span className="icon">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </span>
        </button>
      </div>
      <div className="has-text-centered mt-6 mb-3">
        <h1 className="title is-1 is-uppercase ">Pokedéx</h1>
        <p className="subtitle is-6">
          Your Ultimate Pokémon Guide: Stats, Evolutions, and More!
        </p>
      </div>
    </header>
  );
}
Header.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default Header;
