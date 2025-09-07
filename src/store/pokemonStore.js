import { create } from "zustand";
import { getTheme, getFavoritePokemons } from "../utils/helpers";
import { getPokemonDetails, getPokemonList } from "../services/apiPokemon";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

export const usePokemonStore = create((set, get) => ({
  pokemons: [],
  favoritePokemons: getFavoritePokemons() || [],
  pokemonDetails: {},
  paginationData: {
    current: `${apiUrl}pokemon`,
    prev: null,
    next: null,
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
  updatePokemons: async (currentPosition, page = 1) => {
    try {
      set({ isLoading: true });
      const pokemonList = get().pokemons;
      if (typeof currentPosition === "number") {
        set((prevState) => ({
          paginationData: {
            ...prevState.paginationData,
            current: currentPosition,
            prev: currentPosition === 0 ? 0 : currentPosition - 20,
            next:
              currentPosition === pokemonList.length
                ? pokemonList.length
                : currentPosition + 20,
            numOfPokemons: pokemonList.length,
            currentPage: page ? page : 1,
          },
        }));
        return;
      }

      const { pokemonInfoList, paginationData } = await getPokemonList(
        currentPosition
      );
      set({ pokemons: await Promise.all(pokemonInfoList) });
      set((prevState) => ({
        paginationData: {
          ...prevState.paginationData,
          current: currentPosition,
          prev: paginationData.prev ? paginationData.prev : null,
          next: paginationData.next ? paginationData.next : null,
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
