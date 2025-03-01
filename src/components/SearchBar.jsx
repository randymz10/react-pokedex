import React, { useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function SearchBar() {
  const [formData, setFormData] = useState({ search: "", type: "" });
  const [validationMessage, setValidationMesage] = useState("");

  const updatePokemons = usePokemonStore((state) => state.updatePokemons);
  const updatePokemon = usePokemonStore((state) => state.updatePokemon);
  const pokemonDetails = usePokemonStore((state) => state.pokemon);

  function resetValues() {
    setValidationMesage("");
    setFormData((prevState) => ({ ...prevState, search: "", type: "" }));
  }

  function handleResetValues() {
    resetValues();
    updatePokemons(apiUrl);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = formData.search;
    const searchUrl = `${apiUrl}/${searchQuery.toLowerCase()}`;
    console.log(searchUrl);
    // Validation message when the field is empty
    if (!searchQuery.trim()) {
      setValidationMesage(
        "Please, fill the field with the name or id of the pokemon to continue"
      );
      return;
    }

    updatePokemon(searchUrl);
    console.log(pokemonDetails);
  }

  return (
    <section className="columns is-centered">
      <div className="column is-8">
        {/* Form */}
        <form className="m-5" onSubmit={handleSubmit}>
          <label className="label">Search</label>
          <div className="field is-grouped">
            {/* Input name or ID */}
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                id="search"
                name="search"
                placeholder="Enter pokemon name or number"
                value={formData.search}
                onChange={handleChange}
              />
              {/* Validation Message */}
              {validationMessage && (
                <p className="help is-danger">{validationMessage}</p>
              )}
            </div>
            {/* Submit button */}
            <div className="control">
              <button className="button is-primary">Search</button>
            </div>
            {/* Reset button */}
            <div className="control">
              <button
                type="button"
                className="button is-danger"
                onClick={handleResetValues}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
