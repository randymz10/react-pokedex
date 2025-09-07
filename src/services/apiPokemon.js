export async function getPokemonDetails(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await res.json();
  const pokemonDetails = {
    id: data.id,
    name: data.name,
    abilities: data.abilities.map((ability) => {
      return ability.ability.name;
    }),
    stats: data.stats.map((statItem) => {
      return {
        name: statItem.stat.name,
        base_stat: statItem.base_stat,
      };
    }),
    images: [
      { imageUrl: data.sprites.other["official-artwork"].front_default },
      {
        imageUrl:
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
      },
      {
        imageUrl:
          data.sprites.versions["generation-v"]["black-white"].animated
            .back_default,
      },
    ],
    types: data.types,
    weight: data.weight,
    height: data.height,
  };

  return pokemonDetails;
}

export async function getPokemonList(url) {
  // Fetch the data from the API
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error to fetch pokemons");
  }

  const data = await res.json();
  let pokemonInfoList;
  let paginationData;

  if (!data.results) {
    pokemonInfoList = data.pokemon.map(async (pokemonData) => {
      const pokemonInfo = await getPokemonDetails(pokemonData.pokemon.url);
      return pokemonInfo;
    });

    paginationData = {
      current: url,
      prev: 0,
      next: 20,
      numOfPokemons: data.pokemon.length,
    };
    return { pokemonInfoList, paginationData };
  }
  
  pokemonInfoList = data.results.map(async (pokemonData) => {
    const pokemonUrl = pokemonData.url
      ? pokemonData.url
      : pokemonData.pokemon.pokemon.url;
    const pokemonInfo = await getPokemonDetails(pokemonUrl);
    return pokemonInfo;
  });

  paginationData = {
    current: url,
    prev: data.previous ? data.previous : null,
    next: data.next ? data.next : null,
    numOfPokemons: data.count,
  };

  return { pokemonInfoList, paginationData };
}

export async function getPokemonTypes(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error to fetch types");
  }
  const data = await res.json();
  const types = data.results.map((type) => {
    return type.name;
  });
  return types;
}
