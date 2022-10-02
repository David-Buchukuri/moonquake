import "./App.css";
import LandingPage from "./pages/LandingPage";
import LineChart from "./pages/LineChart";
import BarChart from "./pages/BarChart";
import About from "./pages/About";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/linechart" element={<LineChart />} />
        <Route path="/barchart" element={<BarChart />} />
      </Routes>
    </Router>
  );
}
export default App;
