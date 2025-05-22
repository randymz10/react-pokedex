// eslint-disable-next-line no-unused-vars
import React from "react";
import PokemonList from "../components/PokemonList";

function Favorites() {
  const pokemonList =
    JSON.parse(localStorage.getItem("favoritePokemons")) || [];

  if (pokemonList.length === 0) {
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
      <PokemonList pokemonList={pokemonList} />
    </main>
  );
}

export default Favorites;
