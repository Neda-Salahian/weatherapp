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
      console.log("in useEffect if conditional")
    }
  }, []);

  const handleLogIn = (inputName) => {
    console.log("Logging in:", inputName);
    localStorage.setItem("LoggedInName", JSON.stringify(inputName));
    console.log("in handle log in");
    setName(inputName);
    setIsLoggedIn(true);
  };
  
  return (
    <>
      <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Username.Provider value={{ name, setName }}>
          {isLoggedIn ? <MainContent /> : <StartSite onLogIn={handleLogIn} />}
        </Username.Provider>
      </LogInContext.Provider>
    </>
  );
}

export default App;
