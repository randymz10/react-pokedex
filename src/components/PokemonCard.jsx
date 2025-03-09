import React, { useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import { formatPokemonId } from "../utils/helpers";
import PokemonImage from "./PokemonImage";
import TypeTag from "./TypeTag";

function PokemonCard({ pokemon }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/pokemon/${pokemon.id}`);
  }

  return (
    <div
      className={`cell card m-5 ${isHovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="card-image ">
        <PokemonImage imageUrl={pokemon.images[0].imageUrl} />
      </div>
      <div className="card-content">
        <p className="subtitle is-6">{formatPokemonId(pokemon.id)}</p>
        <h3 className="title is-4 is-capitalized">{pokemon.name}</h3>
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
