//@ts-check
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 *
 * @param {{imageUrl: string, pokemonName: string}} props
 * @returns
 */
function PokemonImage({ imageUrl, pokemonName }) {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/no-camera.png';

  function handleOnLoad() {
    setImageLoading(true);
  }

  function handleError() {
    setImageError(true);
  }

  return (
    <figure className={`image bg-pokeball${imageLoading ? "" : "is-skeleton"}`}>
      <img
        className="image-h"
        src={imageError ? fallbackImage: imageUrl}
        alt={pokemonName}
        loading="lazy"
        onLoad={handleOnLoad}
        onError={handleError}
      />
    </figure>
  );
}

PokemonImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  pokemonName: PropTypes.string.isRequired,
};

export default PokemonImage;
