import React from "react";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";
import { usePokemonStore } from "../store/pokemonStore";

function PokemonList() {
  const pokemonList = usePokemonStore((state) => state.pokemons);

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

export default PokemonList;
