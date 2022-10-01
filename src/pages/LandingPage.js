import Moon from "./../components/Moon";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [parent] = useAutoAnimate(/* optional config */);
  const [resize, setResize] = useState(false)

  const myFunction = () => {
    // your logic here
    setResize(false)
  };

  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Escape') {
        event.preventDefault();

        // 👇️ your logic here
        myFunction();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);  

  return (
    <div className="App" style={{width:`${resize ? "100vw" : "90vw"}`}}>
      {resize ? <></> : <div>
        <h1>here goes title</h1>
        <div ref={parent} className="dropdown">
          <div className="select">
            <p>charts</p>
            <i
              className="arrow down"
              onClick={() => setShowDropdown(!showDropdown)}
            ></i>
          </div>
          {showDropdown ? (
            <div className="options-wrapper">
              <Link to="linechart">line chart</Link>
              <Link to="barchart">bar chart</Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="resize_button_wrapper" onClick={()=>setResize(!resize)}>
            <button type="button" className="resize_button">
              resize
            </button>
          </div>
      </div>}
      
      <Moon widthMultiplier={resize ? 1 : 0.9} heightMultiplier={resize ? 1 : 0.7}/>
    </div>
  );
}

export default LandingPage;
