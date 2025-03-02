import React from "react";
import { usePokemonStore } from "../store/pokemonStore";
import { Link } from "react-router";

function Error() {
  const error = usePokemonStore((state) => state.error);
  return (
    <div className="container has-text-centered my-6">
      <h2 className="title">An error has ocurred</h2>
      <p className="subtitle">{error ? error.message : "Page not found"}</p>

      <Link className="button is-link mt-3" to="/">
        Go back to home
      </Link>
    </div>
  );
}

export default Error;
