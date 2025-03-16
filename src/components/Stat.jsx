import React from "react";

function Stat({ name, value }) {
  return (
    <div className="block">
      <div className="is-flex is-justify-content-space-between">
        <label className="label">{name}</label>
        <span>{value}</span>
      </div>
      <progress
        className="progress is-small"
        value={value}
        max={100}
      ></progress>
    </div>
  );
}

export default Stat;
