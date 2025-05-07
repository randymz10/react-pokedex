import React from "react";

function Loader() {
  return (
    <div className="columns is-centered">
      <div className="column is-one-quarter has-text-centered">
        <h3 className="subtitle is-3">Loading...</h3>
        <progress className="progress is-primary"></progress>
      </div>
    </div>
  );
}

export default Loader;
