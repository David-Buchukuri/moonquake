import Moon from "./../components/Moon";
import axios from "axios";
import { useState, useEffect } from "react";
import ChartDropdown from "../components/ChartDropdown";
import YearDropdown from "../components/YearDropdown";

function LandingPage() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const [resize, setResize] = useState(false);

  // fetch years to make years dropdown for filtering
  const fetchYears = async () => {
    const res = await axios.get(
      "https://test-deployment-production.up.railway.app/api/by-year"
    );
    setYears(res.data.map((el) => el.year));
  };

  useEffect(() => {
    fetchYears();
    // canvas resize event listener and function
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setResize(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className="App" style={{ width: `${resize ? "100vw" : "90vw"}` }}>
      {resize ? (
        <></>
      ) : (
        <div>
          <h1>3D MoonQuake Map</h1>
          <div className="filter__wrapper">
            <ChartDropdown />

            <YearDropdown
              years={years}
              setSelectedYear={setSelectedYear}
              selectedYear={selectedYear}
            />
          </div>
          <div
            className="resize_button_wrapper"
            onClick={() => setResize(!resize)}
          >
            <button type="button" className="resize_button">
              resize
            </button>
          </div>
        </div>
      )}

      <Moon
        widthMultiplier={resize ? 1 : 0.9}
        heightMultiplier={resize ? 1 : 0.7}
        selectedYear={selectedYear}
      />
    </div>
  );
}

export default LandingPage;
