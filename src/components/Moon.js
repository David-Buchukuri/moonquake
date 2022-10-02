import Globe from "react-globe.gl";
import surface from "../images/8k-lunar-surface.jpg";
import bumpMap from "../images/lunar-bumpmap.jpg";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Moon({ widthMultiplier, heightMultiplier, selectedYear }) {
  //   console.log("moon ", ringsData);
  const [markersData, setMarkersData] = useState([]);
  const [ringsData, setRingsData] = useState([]);
  const [filteredMarkersData, setfilteredMarkersData] = useState([]);
  const [filteredRingsData, setfilteredRingsData] = useState([]);

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

  useEffect(() => {
    fetchMarkerAndRingsData();
  }, []);

  //filtering
  useEffect(() => {
    const filteredRing = ringsData.filter((el) => el.year === selectedYear);
    setfilteredRingsData(filteredRing);

    const markerData = markersData.filter((el) => el.year === selectedYear);
    setfilteredMarkersData(markerData);
  }, [selectedYear]);

  return (
    <Globe
      //   key={new Date()}

      width={window.innerWidth * widthMultiplier}
      height={window.innerHeight * heightMultiplier}
      globeImageUrl={surface}
      bumpImageUrl={bumpMap}
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      showGraticules={true}
      labelsData={filteredMarkersData}
      labelText="blank"
      labelSize={1.7}
      labelColor={() => "#D9730D"}
      labelDotRadius={0.7}
      labelDotOrientation="top"
      pointsMerge={true}
      labelAltitude={0.009}
      labelLabel={(d) => `
            <div class='test'>
                <div><b>${d.label}</b></div>
                <div>lat: ${d.lat}°</div>
                <div>lng: ${d.lng}°</div>
                <div class='comment__text'>${d.comment ?? " "}</div>
                <div>Happened<i> ${d.date}</i></div>
            <div>
            `}
      ringsData={filteredRingsData}
      ringColor={() => "#ff0000"}
      ringMaxRadius="maxR"
      ringPropagationSpeed={(d) => d.propagationSpeed}
      ringRepeatPeriod={(d) => d.repeatPeriod}
    />
  );
}

export default Moon;
