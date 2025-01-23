import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(API_URL);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
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
          setPrevUrl(data.previous === null ? API_URL : data.previous);
          setNextUrl(data.next);
          setPokemonList(await Promise.all(pokemonInfoList));
          setError(null);
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }
    fetchPokemon(currentUrl);
  }, [currentUrl]);

  function handlePrev() {
    setCurrentUrl(prevUrl);
  }

  function handleNext() {
    setCurrentUrl(nextUrl);
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={handleTheme} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>Error to fetching data...</div>}
      {!isLoading && !error && (
        <>
          <PokemonList pokemonList={pokemonList} />
          {/* <div className="container is-widescreen"></div> */}
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <button className="pagination-previous" onClick={handlePrev}>
              Prev
            </button>
            <ul className="pagination-list">
              <li>
                <a
                  href="#"
                  className="pagination-link"
                  aria-label="Goto page 1"
                >
                  1
                </a>
              </li>
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
              <li>
                <a
                  href="#"
                  className="pagination-link"
                  aria-label="Goto page 45"
                >
                  45
                </a>
              </li>
              <li>
                <a
                  className="pagination-link is-current"
                  aria-label="Page 46"
                  aria-current="page"
                >
                  46
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="pagination-link"
                  aria-label="Goto page 47"
                >
                  47
                </a>
              </li>
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
              <li>
                <a
                  href="#"
                  className="pagination-link"
                  aria-label="Goto page 86"
                >
                  86
                </a>
              </li>
            </ul>
            <button className="pagination-next" onClick={handleNext}>
              Next
            </button>
          </nav>
        </>
      )}
    </>
  );
}

export default App;
