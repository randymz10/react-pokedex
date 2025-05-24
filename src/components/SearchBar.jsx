// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";
import { useNavigate } from "react-router";
import { getPokemonTypes } from "../services/apiPokemon";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function SearchBar() {
  // Local state
  const [formData, setFormData] = useState({ search: "", type: "" });
  const [validationMessage, setValidationMesage] = useState("");
  const [types, setTypes] = useState([]);
  // Store state
  const updatePokemons = usePokemonStore((state) => state.updatePokemons);
  const updatePokemon = usePokemonStore((state) => state.updatePokemon);
  // Router
  const navigate = useNavigate();

  async function fetchTypes() {
    const types = await getPokemonTypes(`${apiUrl}type`);
    setTypes(types);
  }

  useEffect(() => {
    fetchTypes();
  }, []);

  //Handlers functions
  function resetLocalState() {
    setValidationMesage("");
    setFormData((prevState) => ({ ...prevState, search: "", type: "" }));
  }

  function handleResetValues() {
    resetLocalState();
    updatePokemons(`${apiUrl}pokemon`);
    updatePokemon(null);
    navigate("/");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = formData.search;
    const typeOption = formData.type;

    // Validation message when the field is empty
    if (!searchQuery.trim() && !typeOption) {
      setValidationMesage(
        "Please, fill the field with the name or id of the pokemon to continue"
      );
      return;
    }
    
    if (!searchQuery) {
      updatePokemons(`${apiUrl}type/${typeOption}`);
    } else {
      navigate(`/pokemon/${searchQuery.toLowerCase()}`);
    }

    resetLocalState();
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
            {/* Select type */}
            <div className="control">
              <div className="select">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Select type</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
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
