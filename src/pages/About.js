import video from "../videos/moon-video.mp4";
import { Link } from "react-router-dom";
import ReactAudioPlayer from 'react-audio-player';

export default function About() {
  return (
    <div className="main">
      <div className="overlay"></div>
      <ReactAudioPlayer
        src="/mtvarisMusika.mp3"
        autoPlay
        display="none"
        loop
      />
      <video src={video} autoPlay loop muted="false" />
      <div className="content">
        <h1 className="about-h1">Welcome To The</h1>
        <h1 className="about-h1">Moonquake</h1>

        <button class="start-exploring-btn">
          <Link to="/home" class="about-link">
            Start Exploring!
          </Link>
        </button>
      </div>
    </div>
  );
}
