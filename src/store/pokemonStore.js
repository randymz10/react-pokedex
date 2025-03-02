import { create } from "zustand";
import { getTheme } from "../utils/helpers";
import { getPokemonDetails } from "../services/apiPokemon";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

export const usePokemonStore = create((set) => ({
  pokemons: [],
  pokemonDetails: {},
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
  updatePokemon: async (url) => {
    set({ isLoading: true });

    if (!url) {
      set({ pokemonDetails: {} });
      set({ isLoading: false });
      return;
    }

    try {
      set({ pokemonDetails: getPokemonDetails(url) });
      set({ error: null });
    } catch (error) {
      set({ error: error });
      set({ pokemonDetails: {} });
    } finally {
      set({ isLoading: false });
    }
  },
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
            prevUrl: data.previous ? data.previous : null,
            nextUrl: data.next ? data.next : null,
            numOfPokemons: data.count,
            currentPage: page ? page : 1,
          },
        }));

        set({ pokemons: await Promise.all(pokemonInfoList) });
        set({ error: null });
      })
      .catch((error) => set({ error: error }))
      .finally(() => set({ isLoading: false }));
  },
}));
