// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import { usePokemonStore } from "../store/pokemonStore";

function Favorites() {
  const favoritePokemons = usePokemonStore((state) => state.favoritePokemons);

  if (favoritePokemons.length === 0) {
    return (
      <div className="container">
        <h1 className="title is-1 has-text-centered">No favorites yet</h1>
        <p className="subtitle is-6 has-text-centered">
          Add some Pokémon to your favorites list!
        </p>
      </div>
    );
  }

  return (
    <main className="container">
      <PokemonList pokemonList={favoritePokemons} />
    </main>
  );
}

export default Favorites;
