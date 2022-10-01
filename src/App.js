import React, {useEffect, useState} from "react"
import "./App.css";
import Globe from "react-globe.gl";
import surface from "./images/lunar-surface.jpg";
import bumpMap from "./images/lunar-bumpmap.jpg";
import axios from "axios";

//
function App() {
  const [data, setData] = useState([])
  const labelsTopOrientation = new Set([
    "Apollo 12",
    "Luna 2",
    "Luna 20",
    "Luna 21",
    "Luna 24",
    "LCROSS Probe",
  ]); // avoid label collisions

  // const moonQuakes = axios.get("https://test-deployment-production.up.railway.app/api/statistics");
  const fetch = async() =>{
    const res = await axios.get("https://test-deployment-production.up.railway.app/api/statistics");
    const mappedData = res?.data?.map((element) => {
      return{
        id: element.id,
        lat: element.lat,
        lng: element.long,
        label: `Magnitude: ${element.magnitude}`,
        date: element.timestamp,
        comment: element.comment
      }
    })
    setData(mappedData);    
  }   

  useEffect(() => { 
    fetch();
  },[])
  return (
    <div className="App">
      <Globe
        globeImageUrl={surface}
        bumpImageUrl={bumpMap}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGraticules={true}
        labelsData={data}
        labelText="label"
        labelSize={1.7}
        labelColor ={() => "red"}
        labelDotRadius={0.4}
        labelDotOrientation={(d) =>
          labelsTopOrientation.has(d.label) ? "top" : "bottom"
        }
        labelLabel={(d) => `
    <div><b>${d.label}</b></div>
    <div>lat: ${d.lat}° --- lng: ${d.lng}°</div>
    <div>${d.comment ?? " "}</div>
    <div>Happened<i> ${d.date}</i></div>
  `}
        onLabelClick={(d) => window.open(d.url, "_blank")}
      />
      ;
    </div>
  );
}

export default App;
