import React, { useState } from "react";
import { c } from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

function Dropdown({ triggerText, icon, children }) {
  const [isActive, setIsActive] = useState(false);

  function handleActive() {
    setIsActive((prev) => !prev);
  }

  return (
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleActive}
        >
          <span>{triggerText}</span>
          <span className="icon is-small">{icon}</span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  );
}

export default Dropdown;
