// eslint-disable-next-line no-unused-vars
import React from "react";
import PokemonCard from "./PokemonCard";
import PropTypes from "prop-types";

function PokemonList({ pokemonList }) {
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
