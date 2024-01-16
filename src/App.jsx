import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import CatchDetails from "./context/CatchDetails";

function App() {
  const [object, setObject] = useState({});
  return (
    <>
      <div>
        <CatchDetails.Provider value={{ object, setObject }}>
          <CurrentWeather />
        </CatchDetails.Provider>
      </div>
    </>
  );
}

export default App;