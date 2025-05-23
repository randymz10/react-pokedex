import { create } from "zustand";
import { getTheme, getFavoritePokemons } from "../utils/helpers";
import { getPokemonDetails, getPokemonList } from "../services/apiPokemon";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

export const usePokemonStore = create((set) => ({
  pokemons: [],
  favoritePokemons: getFavoritePokemons() || [],
  pokemonDetails: {},
  paginationData: {
    currentUrl: `${apiUrl}pokemon`,
    prevUrl: null,
    nextUrl: null,
    numOfPokemons: 0,
    currentPage: 1,
  },
  isLoading: false,
  error: null,
  theme: getTheme,

  updateTheme: (newTheme) => set({ theme: newTheme }),
  updateFavoritePokemons: (newFavoritePokemons) => {
    set({ favoritePokemons: newFavoritePokemons });
    localStorage.setItem(
      "favoritePokemons",
      JSON.stringify(newFavoritePokemons)
    );
  },
  updatePokemon: async (url) => {
    set({ isLoading: true });

    if (!url) {
      set({ pokemonDetails: {} });
      set({ isLoading: false });
      return;
    }

    try {
      const pokemonDetails = await getPokemonDetails(url);
      set({ pokemonDetails: pokemonDetails });
      set({ error: null });
    } catch (error) {
      set({ error: error });
      set({ pokemonDetails: {} });
    } finally {
      set({ isLoading: false });
    }
  },
  updatePokemons: async (url, page = 1) => {
    try {
      set({ isLoading: true });
      const { pokemonInfoList, paginationData } = await getPokemonList(url);
      set({ pokemons: await Promise.all(pokemonInfoList) });
      set((prevState) => ({
        paginationData: {
          ...prevState.paginationData,
          currentUrl: url,
          prevUrl: paginationData.prevUrl ? paginationData.prevUrl : null,
          nextUrl: paginationData.nextUrl ? paginationData.nextUrl : null,
          numOfPokemons: paginationData.numOfPokemons,
          currentPage: page ? page : 1,
        },
      }));
      set({ error: null });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
