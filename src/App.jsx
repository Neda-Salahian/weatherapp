<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import "./App.css";

// import Username context
import { Username } from "./context/Username.jsx";
import { LogInContext } from "./context/LogInContext.jsx";

// import component
import StartSite from "./component/01-StartSite.jsx";
import MainContent from "./component/04-MainContent.jsx";

function App() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("LoggedInName");
    
    if (storedName) {
      setName(JSON.parse(storedName));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogIn = (inputName) => {
    localStorage.setItem("LoggedInName", JSON.stringify(inputName));
    setName(inputName);
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("LoggedInName");
    setName("");
    setIsLoggedIn(false)
  }
  
  return (
    <>
      <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Username.Provider value={{ name, setName }}>
          {isLoggedIn ? <MainContent onLogOut = {handleLogOut} /> : <StartSite onLogIn={handleLogIn} />}
        </Username.Provider>
      </LogInContext.Provider>
>>>>>>> 61f3b26f4b5532a3c0b18c7bcb7372244e0ddd0e
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 61f3b26f4b5532a3c0b18c7bcb7372244e0ddd0e
