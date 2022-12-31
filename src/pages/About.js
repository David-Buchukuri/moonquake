import video from "../videos/moon-video.mp4";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

export default function About() {
  return (
    <div className="main">
      <div className="overlay"></div>
      <ReactAudioPlayer
        src="../audio/spaceMusic.mp3"
        type="audio/mpeg"
        autoPlay
        loop
        display="none"
      />

      <video src={video} autoPlay loop muted="true" />

      <div className="content">
        <h1 className="about-h1">Welcome To The</h1>
        <h1 className="about-h1">Moonquake</h1>

        <Link to="/home" className="about-link start-exploring-btn">
          Start Exploring!
        </Link>
      </div>
    </div>
  );
}
