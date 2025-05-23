//@ts-check
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import { usePokemonStore } from "../store/pokemonStore";
import { checkIsFavoritePokemon, formatPokemonId } from "../utils/helpers";

import { FaHeart } from "react-icons/fa6";
import PokemonImage from "./PokemonImage";
import TypeTag from "./TypeTag";

function PokemonCard({ pokemon }) {
  // Local state
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    checkIsFavoritePokemon(pokemon.id)
  );
  // Global state
  const favoritePokemons = usePokemonStore((state) => state.favoritePokemons);
  const updateFavoritePokemons = usePokemonStore(
    (state) => state.updateFavoritePokemons
  );

  const navigate = useNavigate();

  // Functions
  function handleClick() {
    navigate(`/pokemon/${pokemon.id}`);
  }

  function handleFavoritePokemon(e) {
    e.stopPropagation();

    let newFavoritePokemons = [];

    // Check if the pokemon is already in the favorites and mark it as favorite
    if (!isFavorite) {
      newFavoritePokemons = [...favoritePokemons, pokemon];

      localStorage.setItem(
        "favoritePokemons",
        JSON.stringify(newFavoritePokemons)
      );

      updateFavoritePokemons(newFavoritePokemons);
      setIsFavorite(true);
      return;
    }

    // If the pokemon is already in the favorites, remove it from the favorites
    newFavoritePokemons = favoritePokemons.filter(
      (favoritePokemon) => favoritePokemon.id !== pokemon.id
    );
    localStorage.setItem(
      "favoritePokemons",
      JSON.stringify(newFavoritePokemons)
    );
    updateFavoritePokemons(newFavoritePokemons);
    setIsFavorite(false);

    if (newFavoritePokemons.length === 0) {
      localStorage.removeItem("favoritePokemons");
    }
  }

  return (
    <div
      className={`cell card m-5 ${isHovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="card-image ">
        <PokemonImage
          imageUrl={pokemon.images[0].imageUrl}
          pokemonName={pokemon.name}
        />
      </div>
      {/* Card content */}
      <div className="card-content">
        <div className="is-flex is-align-items-center is-justify-content-space-between mb-3">
          <div>
            <p className="subtitle is-6">{formatPokemonId(pokemon.id)}</p>
            <h3 className="title is-4 is-capitalized">{pokemon.name}</h3>
          </div>
          <button
            className={`button is-small is-favorite ${
              isFavorite ? "is-favorite-active" : ""
            }`}
            onClick={handleFavoritePokemon}
          >
            <span className="icon is-small">
              <FaHeart className="" />
            </span>
          </button>
        </div>
        {/* Types */}
        <div className="tags has-text-weight-semibold">
          {pokemon.types.map((pokemontype, i) => (
            <TypeTag key={i} typeName={pokemontype.type.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PokemonCard;
