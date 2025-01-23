import React from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemonList }) {
  return (
    <main className="container">
      <SearchBar />
      <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen">
        <div className="grid">
          {pokemonList?.map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </main>
  );
}

PokemonList.propTypes = {
  pokemonList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
};

export default PokemonList;
