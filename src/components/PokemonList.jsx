// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemonList }) {
  if (pokemonList.length > 20) {
    return (
      <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen">
        <div className="grid">
          {pokemonList?.slice(0, 20).map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen">
      <div className="grid">
        {pokemonList?.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
PokemonList.propTypes = {
  pokemonList: PropTypes.array.isRequired,
};

export default PokemonList;
