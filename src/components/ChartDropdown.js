import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Link } from "react-router-dom";

import { useState } from "react";

export default function ChartDropdown() {
  const [chartParent] = useAutoAnimate(/* optional config */);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div ref={chartParent} className="dropdown">
      <div className="select">
        <p>chart</p>
        <i
          className="arrow down"
          onClick={() => setShowDropdown(!showDropdown)}
        ></i>
      </div>
      {showDropdown && (
        <div className="options-wrapper">
          <Link to="/linechart">line chart</Link>
          <Link to="/barchart">bar chart</Link>
        </div>
      )}
    </div>
  );
}
