import "./App.css";
import { useEffect, useState } from "react";
import { Username } from "./context/Username.jsx";
import { LogInContext } from "./context/LogInContext.jsx";
// import component
import StartSite from "./component/01-StartSite.jsx";
import MainContent from "./component/04-MainContent.jsx";

function App() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("LoggedInName");

    if (storedName) {
      setName(JSON.parse(storedName));
      setIsLoggedIn(true);
    }

    setIsLoading(false);
  }, []);

  const handleLogIn = (inputName) => {
    localStorage.setItem("LoggedInName", JSON.stringify(inputName));
    setName(inputName);
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("LoggedInName");
    setName("");
    setIsLoggedIn(false);
  };
  return (
    <>
      <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Username.Provider value={{ name, setName }}>
          {isLoading ? (
            <></>
          ) : isLoggedIn ? (
            <MainContent onLogOut={handleLogOut} />
          ) : (
            <StartSite onLogIn={handleLogIn} />
          )}
        </Username.Provider>
      </LogInContext.Provider>
    </>
  );
}

export default App;
