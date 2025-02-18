import { create } from "zustand";
import { getTheme } from "../utils/helpers";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

export const usePokemonStore = create((set) => ({
  pokemons: [],
  paginationData: {
    currentUrl: apiUrl,
    prevUrl: null,
    nextUrl: null,
    numOfPokemons: 0,
    currentPage: 1,
  },
  isLoading: false,
  error: null,
  theme: getTheme,

  updateTheme: (newTheme) => set({ theme: newTheme }),
  updatePokemons: (url, page = 1) => {
    set({ isLoading: true });
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
        set((prevState) => ({
          paginationData: {
            ...prevState.paginationData,
            currentUrl: url,
            prevUrl: data.previous,
            nextUrl: data.next,
            numOfPokemons: data.count,
            currentPage: page,
          },
        }));
        set({ pokemons: await Promise.all(pokemonInfoList) });
        set({ error: null });
      })
      .catch((error) => set({ error: error }))
      .finally(() => set({ isLoading: false }));
  },
}));
