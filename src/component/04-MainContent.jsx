import { Username } from "../context/Username.jsx";
import { useContext, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import CatchDetails from "./context/CatchDetails";   
function MainContent({onLogOut}) {
  const { name } = useContext(Username);
  const [object, setObject] = useState({});
  return (
    <div className="maincontent-bg">
      <div className="maincontent-container">
        <h3>Hi {name}, Have a nice day!</h3>
        <p>The API renders here</p>
      </div>
      <CatchDetails.Provider value={{object, setObject}}>
      <CurrentWeather />  
      </CatchDetails.Provider>
      
      <div className="fetch-section">
      </div>

      <button onClick={onLogOut}>Log Out</button>
    </div>
  );
}

export default MainContent;
