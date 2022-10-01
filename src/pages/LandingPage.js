import Moon from "./../components/Moon";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);
  const [filterValue, setFilterValue] = useState("")
  const [chartParent] = useAutoAnimate(/* optional config */);
  const [filterParent] = useAutoAnimate(/* optional config */);

  useEffect(() => {
    axios.get('http://localhost:8000/api/statistics/by-year'
    ).then((res)=>console.log(res))
  },[])


  console.log(showDropdown, showFilterList);
  return (
    <div className="App">
      <h1>here goes title</h1>
      <div className="filter__wrapper">
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
            <Link to="linechart">line chart</Link>
            <Link to="barchart">bar chart</Link>
          </div>
        )}
      </div>
      <div ref={filterParent} className="dropdown">
        <div className="select">
          <p>{filterValue || 'Filter'}</p>
          <i
            className="arrow down"
            onClick={() => setShowFilterList(!showFilterList)}
          ></i>
        </div>
        {showFilterList && (
          <div className="options-wrapper">
            <span onClick={(e) => setFilterValue(e.target.value)}>raghaca</span>
          </div>
        )}
      </div>
      </div>

      <Moon />
    </div>
  );
}

export default LandingPage;
