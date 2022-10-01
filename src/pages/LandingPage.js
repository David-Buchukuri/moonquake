import Moon from "./../components/Moon";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="App">
      <h1>here goes title</h1>
      <div className="dropdown">
        <div className="select">
          <p>dropdown</p>
          <i class="arrow down"></i>
        </div>
        <div className="options-wrapper">
          <Link to="linechart">line chart</Link>
          <Link to="linechart">bar chart</Link>
        </div>
      </div>
      <Moon />
    </div>
  );
}

export default LandingPage;
