import React, { useEffect, useState } from "react";

const API_URL = "https://pokeapi.co/api/v2/type/?offset=0&limit=21";

function SearchBar() {
  const [formData, setFormData] = useState({ search: "", type: "" });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const pokemonTypes = data.results;
        const typesName = pokemonTypes.map((type) => type.name);
        setOptions(typesName);
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="columns is-centered">
      <div className="column is-8">
        <form className="m-5" onSubmit={handleSubmit}>
          <label className="label">Search</label>
          <div className="field is-grouped">
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
            </div>
            <div className="control">
              <div className="select">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  {options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="control">
              <button className="button is-primary">Search</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
