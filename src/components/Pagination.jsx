import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { usePokemonStore } from "../store/pokemonStore";

const apiUrl = import.meta.env.VITE_API_URL;

function Pagination() {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { numOfPokemons, currentPage, prevUrl, nextUrl } = usePokemonStore(
    (state) => state.paginationData
  );
  const updatePokemons = usePokemonStore((state) => state.updatePokemons);

  const numOfPages = Math.ceil(numOfPokemons / 20);

  function handleDropdown() {
    setIsDropdownActive((prev) => !prev);
  }

  function handlePrev() {
    const page = currentPage - 1;
    updatePokemons(prevUrl, page);
  }

  function handleNext() {
    const page = currentPage + 1;
    updatePokemons(nextUrl, page);
  }

  function handlePage(page) {
    console.log(page);
    const url = `${apiUrl}?offset=${(page - 1) * 20}`;
    updatePokemons(url, page);
  }

  return (
    <div className="columns is-centered is-mobile mt-1">
      <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <button
            className={`pagination-previous ${!prevUrl ? "is-disabled" : ""}`}
            onClick={handlePrev}
            disabled={!prevUrl}
          >
            Prev
          </button>
          <button
            className={`pagination-next ${!nextUrl ? "is-disabled" : ""}`}
            onClick={handleNext}
            disabled={!nextUrl}
          >
            Next
          </button>
          <div className="pagination-list">
            <div
              className={`dropdown is-up ${
                isDropdownActive ? "is-active" : ""
              }`}
            >
              <div className="dropdown-trigger">
                <button
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  onClick={handleDropdown}
                >
                  <span>Select Page</span>
                  <span className="icon is-small">
                    <FaAngleUp />
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {Array.from({ length: numOfPages }, (_, index) => {
                    const page = index + 1;
                    return (
                      <a
                        key={page}
                        onClick={() => handlePage(page)}
                        className={`dropdown-item ${
                          currentPage === page ? "is-active" : ""
                        }`}
                      >
                        {page}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="content has-text-centered">
          {`Page ${currentPage} of ${numOfPages}`}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
