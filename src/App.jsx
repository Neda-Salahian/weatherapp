import { useState } from "react";
import "./App.css";

// import Username context
import { Username } from "./context/Username.jsx";

// import component
import StartSite from "./component/01-StartSite.jsx";

function App() {

  const [name, setName] = useState("");

  return (
  <>
  <Username.Provider value={{name, setName}}>
    <StartSite/>

  </Username.Provider>
  
  </>
  )
}

export default App;
