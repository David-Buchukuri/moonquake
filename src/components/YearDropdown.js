import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useState } from "react";

export default function YearDropdown({ years, setSelectedYear, selectedYear }) {
  const [chartParent] = useAutoAnimate(/* optional config */);
  const [showDropdown, setShowDropdown] = useState(false);

  const yearsContainer = () => {
    return (
      <div className="options-wrapper">
        <p
          className="year"
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          All
        </p>
        {years.map((el, index) => {
          return (
            <p
              className="year"
              key={index}
              onClick={() => {
                setShowDropdown(false);
                setSelectedYear(el);
              }}
            >
              {el}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={chartParent} className="dropdown">
      <div className="select">
        {selectedYear ? <p>{selectedYear}</p> : <p>years</p>}

        <i
          className="arrow down"
          onClick={() => setShowDropdown(!showDropdown)}
        ></i>
      </div>

      {showDropdown && yearsContainer()}
    </div>
  );
}
