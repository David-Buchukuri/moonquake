import Globe from "react-globe.gl";
import surface from "../images/8k-lunar-surface.jpg";
import bumpMap from "../images/lunar-bumpmap.jpg";
import "../App.css";

function Moon({ widthMultiplier, heightMultiplier, markersData, ringsData }) {
  console.log("moon ", ringsData);

  return (
    <Globe
      //   key={new Date()}
      width={window.innerWidth * widthMultiplier}
      height={window.innerHeight * heightMultiplier}
      globeImageUrl={surface}
      bumpImageUrl={bumpMap}
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      showGraticules={true}
      labelsData={markersData}
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
      ringsData={ringsData}
      ringColor={() => "#ff0000"}
      ringMaxRadius="maxR"
      ringPropagationSpeed={(d) => d.propagationSpeed}
      ringRepeatPeriod={(d) => d.repeatPeriod}
    />
  );
}

export default Moon;
