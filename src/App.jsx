import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [paginationData, setPaginationdata] = useState({
    currentUrl: API_URL,
    prevUrl: null,
    nextUrl: null,
    numOfPokemons: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(getTheme());

  function getTheme() {
    if (localStorage.getItem("theme") === null) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return localStorage.getItem("theme");
  }

  function handleTheme() {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  }

  useEffect(
    function () {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    },
    [theme]
  );

  useEffect(() => {
    function fetchPokemon(url) {
      setIsLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then(async (data) => {
          const pokemonInfoList = data.results.map(async (pokemonData) => {
            const res = await fetch(pokemonData.url);
            const data = await res.json();
            const pokemonInfo = {
              id: data.id,
              name: data.name,
              imageUrl: data.sprites.other["official-artwork"].front_default,
              types: data.types,
            };
            return pokemonInfo;
          });
          setPaginationdata((prevData) => ({
            ...prevData,
            currentUrl: url,
            prevUrl: data.previous,
            nextUrl: data.next,
            numOfPokemons: data.count,
          }));
          setPokemonList(await Promise.all(pokemonInfoList));
          setError(null);
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }
    fetchPokemon(paginationData.currentUrl);
  }, [paginationData.currentUrl]);

  function handlePrev(page) {
    setPaginationdata((prevData) => ({
      ...prevData,
      currentUrl: paginationData.prevUrl,
      currentPage: page,
    }));
  }

  function handleNext(page) {
    setPaginationdata((prevData) => ({
      ...prevData,
      currentUrl: paginationData.nextUrl,
      currentPage: page,
    }));
  }

  function handlePage(page) {
    setPaginationdata((prevData) => ({
      ...prevData,
      currentUrl: `${API_URL}?offset=${(page - 1) * 20}`,
      currentPage: page,
    }));
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={handleTheme} />
      <Loader />
      {isLoading && <Loader />}
      {!isLoading && error && <div>Error to fetching data...</div>}
      {!isLoading && !error && (
        <>
          <PokemonList pokemonList={pokemonList} />
          {/* <div className="container is-widescreen"></div> */}
          <Pagination
            paginationData={paginationData}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}

export default App;
