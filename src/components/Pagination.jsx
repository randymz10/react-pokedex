import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import PropTypes from "prop-types";
import { usePokemonStore } from "../store/pokemonStore";

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

  function handlePrev(page) {
    updatePokemons(prevUrl)
  }

  function handleNext(page) {
    setPaginationdata((prevData) => ({
      ...prevData,
      currentUrl: nextUrl,
      currentPage: page,
    }));
  }

  function handlePage(page) {
    setPaginationdata((prevData) => ({
      ...prevData,
      currentUrl: `${apiUrl}?offset=${(page - 1) * 20}`,
      currentPage: page,
    }));
  }

  return (
    <div className="columns is-centered is-mobile">
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
              <div>
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
          </div>
        </nav>
      </div>
    </div>
  );
}
Pagination.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePage: PropTypes.func.isRequired,
  paginationData: PropTypes.shape({
    numOfPokemons: PropTypes.number.isRequired,
    currentUrl: PropTypes.string.isRequired,
    prevUrl: PropTypes.string,
    nextUrl: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
  }).isRequired,
};

export default Pagination;
