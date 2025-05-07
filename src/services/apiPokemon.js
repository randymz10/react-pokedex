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

  // let pokemonInfoList;
  // let paginationData;

  // if (isByType) {
  //   pokemonInfoList = data.pokemon.map(async (pokemonData) => {
  //     const pokemonInfo = await getPokemonDetails(pokemonData.pokemon.url);
  //     return pokemonInfo;
  //   });
  // }
  // If not by type, fetch the pokemon details from the url

  const pokemonInfoList = data.results.map(async (pokemonData) => {
    const pokemonUrl = pokemonData.url
      ? pokemonData.url
      : pokemonData.pokemon.pokemon.url;
    const pokemonInfo = await getPokemonDetails(pokemonUrl);
    return pokemonInfo;
  });

  const paginationData = {
    currentUrl: url,
    prevUrl: data.previous ? data.previous : null,
    nextUrl: data.next ? data.next : null,
    numOfPokemons: data.count,
  };

  return { pokemonInfoList, paginationData };
}

export async function getPokemonTypes(url) {
  console.log(url);
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
