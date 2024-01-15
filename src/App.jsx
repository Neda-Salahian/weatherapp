import { useState } from "react";
import "./App.css";

// import Username context
import { Username } from "./context/Username.jsx";

// import component
import StartSite from "./component/01-StartSite.jsx";
import MainContent from "./component/04-MainContent.jsx";

function App() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  const handleLogIn = () => {
    if(name.trim() !== ""){
      setIsLoggedIn(true)
    }
  }

  return (
    <>
      <Username.Provider value={{ name, setName }}>

        {isLoggedIn? (<MainContent/>) : (<StartSite onLogIn = {handleLogIn}/>)}
        <StartSite />
      </Username.Provider>
    </>
  );
}

export default App;
