import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

function PokemonImage({ imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleOnLoad() {
    setImageLoaded(true);
  }

  return (
    <figure className={`image bg-pokeball${imageLoaded ? "" : "is-skeleton"}`}>
      <img
        className="image-h"
        src={imageUrl}
        loading="lazy"
        onLoad={handleOnLoad}
      />
    </figure>
  );
}

PokemonImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default PokemonImage;
