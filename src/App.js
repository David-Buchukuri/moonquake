import "./App.css";
import Globe from "react-globe.gl";
import surface from "./images/lunar-surface.jpg";
import bumpMap from "./images/lunar-bumpmap.jpg";

//
function App() {
  const labelsTopOrientation = new Set([
    "Apollo 12",
    "Luna 2",
    "Luna 20",
    "Luna 21",
    "Luna 24",
    "LCROSS Probe",
  ]); // avoid label collisions

  return (
    <div className="App">
      <Globe
        globeImageUrl={surface}
        bumpImageUrl={bumpMap}
        // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGraticules={true}
        labelsData={[
          {
            lat: 0.6737,
            lng: 23.47295,
            label: "jemala",
            program: "Apollo",
            agency: "NASA",
            date: "1969-7-20",
            url: "https://en.wikipedia.org/wiki/Apollo_11",
          },
          {
            lat: -3.01184,
            lng: -23.42156,
            label: "Apollo 12",
            program: "Apollo",
            agency: "NASA",
            date: "1969-11-19",
            url: "https://en.wikipedia.org/wiki/Apollo_12",
          },
        ]}
        labelText="label"
        labelSize={1.7}
        labelDotRadius={0.4}
        labelDotOrientation={(d) =>
          labelsTopOrientation.has(d.label) ? "top" : "bottom"
        }
        labelLabel={(d) => `
    <div><b>${d.label}</b></div>
    <div>${d.agency} - ${d.program} Program</div>
    <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
  `}
        onLabelClick={(d) => window.open(d.url, "_blank")}
      />
      ;
    </div>
  );
}

export default App;
