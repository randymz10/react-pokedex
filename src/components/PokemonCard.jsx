import React, { useState } from "react";
import PropTypes from "prop-types";

const typeColors = {
  normal: "",
  fire: "is-fire has-text-black",
  water: "is-water has-text-black",
  electric: "is-electric has-text-black",
  grass: "is-grass has-text-black",
  ice: "is-ice has-text-black",
  fighting: "is-fighting has-text-white",
  poison: "is-poison has-text-black",
  ground: "is-ground has-text-black",
  flying: "is-flying has-text-black",
  psychic: "is-psychic has-text-black",
  bug: "is-bug has-text-black",
  rock: "is-rock has-text-white",
  ghost: "is-ghost has-text-white",
  dragon: "is-dragon has-text-white",
  dark: "is-dark has-text-white",
  steel: "is-steel has-text-white",
  fairy: "is-fairy has-text-black",
};

function formatPokemonId(id) {
  return id.toString().padStart(3, "0");
}

function PokemonCard({ pokemon }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleOnLoad() {
    setImageLoaded(true);
  }

  return (
    <div
      className={`cell card m-5 ${isHovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image ">
        <figure className={`image ${imageLoaded ? "" : "is-skeleton"}`}>
          <img
            className="image-h"
            src={pokemon.imageUrl}
            loading="lazy"
            onLoad={handleOnLoad}
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="subtitle is-6">#{formatPokemonId(pokemon.id)}</p>
        <h3 className="title is-4 is-capitalized">{pokemon.name}</h3>
        <div className="tags has-text-weight-semibold">
          {pokemon.types.map((pokemontype, i) => (
            <span
              key={i}
              className={`tag ${typeColors[pokemontype.type.name]}`}
            >
              {pokemontype.type.name}
            </span>
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
    imageUrl: PropTypes.string.isRequired,
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
