// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import PokemonList from "../components/PokemonList";
import { usePokemonStore } from "../store/pokemonStore";
import Loader from "../components/Loader";
import Error from "./Error";
import Pagination from "../components/Pagination";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const isLoading = usePokemonStore((state) => state.isLoading);
  const error = usePokemonStore((state) => state.error);
  const updatePokemons = usePokemonStore((state) => state.updatePokemons);
  const pokemonList = usePokemonStore((state) => state.pokemons);

  useEffect(() => {
    updatePokemons(`${apiUrl}pokemon`);
  }, [updatePokemons]);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <main className="container">
      <PokemonList pokemonList={pokemonList} />
      <Pagination />
    </main>
  );
}

export default Home;
