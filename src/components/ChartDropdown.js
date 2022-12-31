import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Link } from "react-router-dom";

import { useState } from "react";

export default function ChartDropdown() {
  const [chartParent] = useAutoAnimate(/* optional config */);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div ref={chartParent} className="dropdown">
      <div className="select" onClick={() => setShowDropdown(!showDropdown)}>
        <p>charts</p>
        <i className="arrow down"></i>
      </div>
      {showDropdown && (
        <div className="options-wrapper">
          <Link to="/linechart" className="dropdown-item">
            line chart
          </Link>
          <Link to="/barchart" className="dropdown-item">
            bar chart
          </Link>
        </div>
      )}
    </div>
  );
}
