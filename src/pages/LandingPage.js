import Moon from "./../components/Moon";
import axios from "axios";
import { useState, useEffect } from "react";
import ChartDropdown from "../components/ChartDropdown";
import YearDropdown from "../components/YearDropdown";

function LandingPage() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [ringsData, setRingsData] = useState([]);
  const [filteredMarkersData, setfilteredMarkersData] = useState([]);
  const [filteredRingsData, setfilteredRingsData] = useState([]);
  const [resize, setResize] = useState(false);

  // fetch and process rings and markers data for moon component
  const fetchMarkerAndRingsData = async () => {
    const res = await axios.get(
      "https://test-deployment-production.up.railway.app/api/statistics"
    );
    const pointsData = res?.data?.map((element) => {
      return {
        id: element.id,
        lat: element.lat,
        lng: element.long,
        label: `Magnitude: ${element.magnitude}`,
        blank: ``,
        magnitude: Number(element.magnitude),
        date: element.timestamp,
        year: Number(element.timestamp.substring(0, 4)),
        comment: element.comment,
      };
    });
    setMarkersData(pointsData);

    const ringsData = pointsData.map((el) => {
      return {
        lat: el.lat,
        lng: el.lng,
        maxR: el.magnitude * 2,
        propagationSpeed: el.magnitude,
        repeatPeriod: 800,
        year: el.year,
      };
    });

    setRingsData(ringsData);
  };

  // fetch years to make years dropdown for filtering
  const fetchYears = async () => {
    const res = await axios.get("http://localhost:8000/api/statistics/by-year");
    setYears(res.data.map((el) => el.year));
  };

  useEffect(() => {
    fetchYears();
    fetchMarkerAndRingsData();

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

  //filtering
  useEffect(() => {
    const filteredRing = ringsData.filter((el) => el.year === selectedYear);
    setfilteredRingsData(filteredRing);

    const markerData = markersData.filter((el) => el.year === selectedYear);
    setfilteredMarkersData(markerData);
  }, [selectedYear, markersData, ringsData]);

  return (
    <div className="App" style={{ width: `${resize ? "100vw" : "90vw"}` }}>
      {resize ? (
        <></>
      ) : (
        <div>
          <h1>here goes title</h1>
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
        markersData={
          filteredMarkersData.length ? filteredMarkersData : markersData
        }
        ringsData={filteredRingsData.length ? filteredRingsData : ringsData}
      />
    </div>
  );
}

export default LandingPage;
