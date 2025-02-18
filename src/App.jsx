import React, { useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import { usePokemonStore } from "./store/pokemonStore";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;  

function App() {
  const isLoading = usePokemonStore((state) => state.isLoading);
  const error = usePokemonStore((state) => state.error);

  const updatePokemons = usePokemonStore((state) => state.updatePokemons);

  useEffect(() => {
    updatePokemons(apiUrl);
  }, []);

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      {!isLoading && error && <div>Error to fetching data...</div>}
      {!isLoading && !error && (
        <>
          <PokemonList />
          {/* <div className="container is-widescreen"></div> */}
          <Pagination />
        </>
      )}
    </>
  );
}

export default App;
