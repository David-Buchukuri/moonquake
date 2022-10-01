import Moon from "./../components/Moon";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Link } from "react-router-dom";
import { useState } from "react";

function LandingPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [parent] = useAutoAnimate(/* optional config */);

  return (
    <div className="App">
      <h1>here goes title</h1>
      <div ref={parent} className="dropdown">
        <div className="select">
          <p>charts</p>
          <i
            className="arrow down"
            onClick={() => setShowDropdown(!showDropdown)}
          ></i>
        </div>
        {showDropdown ? (
          <div className="options-wrapper">
            <Link to="linechart">line chart</Link>
            <Link to="barchart">bar chart</Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <Moon />
    </div>
  );
}

export default LandingPage;
