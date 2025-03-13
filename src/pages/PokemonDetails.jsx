import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { formatPokemonId } from "../utils/helpers";
import { usePokemonStore } from "../store/pokemonStore";

import PokemonImage from "../components/PokemonImage";
import TypeTag from "../components/TypeTag";
import Loader from "../components/Loader";
import EmblaCarousel from "../components/EmblaCarousel";

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

  const OPTIONS = {};
  const SLIDES = pokemonDetails.images?.map((imgObj, index) => {
    return <PokemonImage key={index} imageUrl={imgObj.imageUrl} />;
  });

  return (
    <section className="container">
      <div className="columns">
        <div className="column">
          <div className="card mx-6 pb-4">
            {/* Carousel */}
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />

            {/* <PokemonImage imageUrl={pokemonDetails.imageUrl} /> */}
          </div>
        </div>

        <div className="column">
          <div className="card px-6 py-4 mx-6">
            <div className="card-header is-flex is-justify-content-center">
              <h2 className="title is-2 is-capitalized">
                {pokemonDetails.name}{" "}
                <span className="subtitle is-5">
                  {formatPokemonId(pokemonDetails.id)}
                </span>
              </h2>
            </div>
            <div className="card-content">
              <div className="is-flex is-justify-content-space-between">
                <p>
                  <strong>Height:</strong> {pokemonDetails.height} decimetres
                </p>
                <p>
                  <strong>Weight:</strong> {pokemonDetails.weight} hectograms
                </p>
              </div>
              <p className="tags">
              <span><strong>Types:</strong></span>
                {pokemonDetails.types?.map((pokemonType) => (
                  <TypeTag
                    key={pokemonType.type.name}
                    typeName={pokemonType.type.name}
                  />
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="button is-link mt-3">
        Back to Home
      </Link>
    </section>
  );
}

export default PokemonDetails;
