// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";
import { usePokemonStore } from "../store/pokemonStore";

function PokemonList({ pokemonList }) {
  const { current, next } = usePokemonStore((state) => state.paginationData);
  console.log(current, next);
  
  return (
    <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen">
      <div className="grid">
        {pokemonList.length > 20
          ? pokemonList
              ?.slice(current, next)
              .map((pokemon, i) => <PokemonCard key={i} pokemon={pokemon} />)
          : pokemonList?.map((pokemon, i) => (
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
