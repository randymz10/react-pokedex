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

  useEffect(() => {
    updatePokemons(apiUrl);
  }, [updatePokemons]);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <main className="container">
      <PokemonList />
      <Pagination />
    </main>
  );
}

export default Home;
