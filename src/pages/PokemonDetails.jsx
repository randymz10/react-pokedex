import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { dmToM, formatPokemonId, hgToKg } from "../utils/helpers";
import { usePokemonStore } from "../store/pokemonStore";

import PokemonImage from "../components/PokemonImage";
import TypeTag from "../components/TypeTag";
import Loader from "../components/Loader";
import EmblaCarousel from "../components/EmblaCarousel";
import { FaArrowLeft } from "react-icons/fa6";
import Stat from "../components/Stat";

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
      <div className="mb-4 ml-6">
        <Link to="/" className="button is-ghost mt-3">
          <span className="icon">
            <FaArrowLeft />
          </span>
          <span>Back</span>
        </Link>
      </div>
      <div className="card px-6 py-4 mx-6 mb-6">
        <div className="card-content">
          <div className="columns">
            <div className="column">
              {/* Carousel */}
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>

            <div className="column">
              <h2 className="title is-2 is-capitalized">
                {pokemonDetails.name}{" "}
                <span className="subtitle is-5">
                  {formatPokemonId(pokemonDetails.id)}
                </span>
              </h2>
              <div className="is-flex is-justify-content-space-between">
                <p>
                  <strong>Height:</strong> {dmToM(pokemonDetails.height)} m
                </p>
                <p>
                  <strong>Weight:</strong> {hgToKg(pokemonDetails.weight)} Kg
                </p>
              </div>
              <p className="tags my-2">
                <span>
                  <strong>Abilities:</strong>
                </span>
                {pokemonDetails.abilities?.map((ability, index) => (
                  <span key={index} className="tag">
                    {ability}
                  </span>
                ))}
              </p>
              <p className="tags mt-2">
                <span>
                  <strong>Types:</strong>
                </span>
                {pokemonDetails.types?.map((pokemonType) => (
                  <TypeTag
                    key={pokemonType.type.name}
                    typeName={pokemonType.type.name}
                  />
                ))}
              </p>
              <div className="block">
                <h3 className="title is-4">Stats</h3>
                {pokemonDetails.stats?.map((stat) => (
                  <Stat
                    key={stat.name}
                    name={stat.name.toUpperCase()}
                    value={stat.base_stat}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetails;
