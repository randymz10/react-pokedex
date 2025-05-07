import React from "react";
import PropTypes from "prop-types";

function DropdownItem({ label, isActive, onClick }) {
  return (
    <a
      className={`dropdown-item ${isActive ? "is-active" : ""}`}
      onClick={onClick}
    >
      {label}
    </a>
  );
}

DropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DropdownItem;
