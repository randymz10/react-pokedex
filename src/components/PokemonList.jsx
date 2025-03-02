import React from "react";
import { usePokemonStore } from "../store/pokemonStore";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const pokemonList = usePokemonStore((state) => state.pokemons);

  return (
    <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen">
      <div className="grid">
        {pokemonList?.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon}/>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
