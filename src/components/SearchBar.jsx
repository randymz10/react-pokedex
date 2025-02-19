import React, { useEffect, useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";

const apiUrlTypes = "https://pokeapi.co/api/v2/type/";
// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function SearchBar() {
  const [formData, setFormData] = useState({ search: "", type: "" });
  const [options, setOptions] = useState([]);
  const [validationMessage, setValidationMesage] = useState("");

  const updatePokemons = usePokemonStore((state) => state.updatePokemons);

  useEffect(() => {
    fetch(apiUrlTypes)
      .then((res) => res.json())
      .then((data) => {
        const pokemonTypes = data.results;
        const typesName = pokemonTypes.map((type) => type.name);
        setOptions(typesName);
      });
  }, []);

  function handleResetValues() {
    setValidationMesage("");
    setFormData((prevState) => ({ ...prevState, search: "", type: "" }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const type = formData.type;
    const searchQuery = formData.search;

    // Validation message when the fields are empty
    if (!searchQuery.trim() && !type.trim()) {
      setValidationMesage(
        "Please, fill the field with the name or id, or select a type."
      );
      return;
    }

    // When only exists the searchQuery
    if (searchQuery.trim() && !type.trim()) {
      const newUrl = `${apiUrl}${searchQuery}`;
      updatePokemons(newUrl);
      handleResetValues();
      return;
    }

    // When only exists the type
    if (!searchQuery.trim() && type.trim()) {
      const newUrl = `${apiUrlTypes}${type}`;
      updatePokemons(newUrl);
      console.log("executed");
      handleResetValues();
      return;
    }

    // updatePokemons(newUrl);
  }

  return (
    <section className="columns is-centered">
      <div className="column is-8">
        {/* Formulario */}
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
            {/* Option selector */}
            <div className="control">
              <div className="select">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  {/* {Options} */}
                  {options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Submit button */}
            <div className="control">
              <button type="button" className="button is-primary">
                Search
              </button>
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
