import video from "../videos/moon-video.mp4";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted />
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
