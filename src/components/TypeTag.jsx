import React from "react";
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

function TypeTag({ typeName }) {
  return (
    <span className={`tag ${typeColors[typeName]} has-text-weight-bold`}>
      {typeName}
    </span>
  );
}

TypeTag.propTypes = {
  typeName: PropTypes.string.isRequired,
};

export default TypeTag;
