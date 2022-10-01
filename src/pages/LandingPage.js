import Moon from "./../components/Moon";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [chartParent] = useAutoAnimate(/* optional config */);
  const [filterParent] = useAutoAnimate(/* optional config */);

  const [years, setYears] = useState([]);
  const [filteredYears, setFilteredYears] = useState([]);

  const [resize, setResize] = useState(false)

  const myFunction = () => {
    // your logic here
    setResize(false)
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/statistics/by-year")
      .then((res) => setYears(res.data.map((el) => el.year)));
      const keyDownHandler = event => {
        console.log('User pressed: ', event.key);
  
        if (event.key === 'Escape') {
          event.preventDefault();
  
          // 👇️ your logic here
          myFunction();
        }
      };
  
      document.addEventListener('keydown', keyDownHandler);
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
  }, []);

  const yearsToFilter = () => {
    // return <span onClick={(e) => setFilterValue(e.target.value)}>raghaca</span>;
    let arr = years.map((el) => {
      return (
        <span key={el.year} onClick={() => filtereYears(el.year)}>
          {el.year}
        </span>
      );
    });

    return arr;
  };

  const filtereYears = (year) => {
    console.log(year);
  };

  console.log(showDropdown, showFilterList);
  return (
    <div className="App" style={{width:`${resize ? "100vw" : "90vw"}`}}>
      {resize ? <></> : <div>
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
              <p>{filterValue || "Filter"}</p>
              <i
                className="arrow down"
                onClick={() => setShowFilterList(!showFilterList)}
              ></i>
            </div>
            {showFilterList && (
              <div className="options-wrapper">
                {years.map((el, index) => {
                  return (
                    <span key={index} onClick={() => filtereYears(el)}>
                      {el}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="resize_button_wrapper" onClick={()=>setResize(!resize)}>
            <button type="button" className="resize_button">
              resize
            </button>
          </div>
      </div>}

      <Moon widthMultiplier={resize ? 1 : 0.9} heightMultiplier={resize ? 1 : 0.7}/>
    </div>
  );
}

export default LandingPage;
