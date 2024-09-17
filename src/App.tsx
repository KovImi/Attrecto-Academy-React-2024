import React, { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import { Button } from "./components/button/Button";

function App() {
  const [count, setCount] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
   
  const updateCounter = (increase: boolean) => {
    setCount((currentValue) => {
      if (increase) {
        setShowAlert(false);
        return currentValue + 1;
      }
      else if (!increase && currentValue > 0) {
        return currentValue - 1;
      }
      else {
        setShowAlert(true);
        return 0;
      }
    });
  };

  return (
    <div className="App">

      <header className="App-header">
        <Navbar />
      </header>
      {showAlert && (
        <div className="container-fluid text-center mt-4 d-flex justify-content-center ">
          <div className="alert alert-danger" role="alert">
            A számláló nem lehet nullánál kevesebb!
          </div>
        </div>
      )}
      <div className="container d-flex justify-content-center">
        <div className="card bg-white shadow text-center p-4 m-4">
          <h1>Counter: {count}</h1>
          <div className="d-flex justify-content-center flex-wrap gap-2">
            <Button color="primary" onClick={() => updateCounter(true)}>
              Increase +
            </Button>
            <Button color="secondary" onClick={() => updateCounter(false)}>
              Decrease -
            </Button>
            <Button color="danger" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
