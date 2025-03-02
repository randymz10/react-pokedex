import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { formatPokemonId } from "../utils/helpers";
import { usePokemonStore } from "../store/pokemonStore";

import PokemonImage from "../components/PokemonImage";
import TypeTag from "../components/TypeTag";
import Loader from "../components/Loader";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function PokemonDetails() {
  const updatePokemon = usePokemonStore((state) => state.updatePokemon);
  const pokemonDetails = usePokemonStore((state) => state.pokemonDetails);
  const isLoading = usePokemonStore((state) => state.isLoading);
  const error = usePokemonStore((state) => state.error);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pokemonIdentifier = location.pathname.split("/")[2];
    const searchUrl = `${apiUrl}${pokemonIdentifier}`;
    updatePokemon(searchUrl);
  }, [location.pathname, updatePokemon]);

  if (isLoading) return <Loader />;
  if (error) navigate("/error");

  return (
    <>
      <div className="columns">
        <div className="column">
          <PokemonImage imageUrl={pokemonDetails.imageUrl} />
          <div className="tags is-centered">
            {pokemonDetails.types?.map((pokemonType) => (
              <TypeTag
                key={pokemonType.type.name}
                typeName={pokemonType.type.name}
              />
            ))}
          </div>
        </div>

        <div className="column has-text-centered">
          <h2 className="title is-2 is-capitalized">
            {pokemonDetails.name}{" "}
            <span className="subtitle is-5">
              {formatPokemonId(pokemonDetails.id)}
            </span>
          </h2>
          
        </div>
      </div>
      <Link to="/" className="button is-link mt-3">
        Back to Home
      </Link>
    </>
  );
}

export default PokemonDetails;
