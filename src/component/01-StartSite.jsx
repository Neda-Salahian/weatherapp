import Header from "./02-Header.jsx";
import FormUserName from "./03-Form.jsx";
import { useState } from "react";
import MainContent from "./04-MainContent.jsx";

function StartSite() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogIn = () => {
        setIsLoggedIn(true)
    }
  return (
    <div className="bg-startsite">

        {!isLoggedIn ? 
        (<div className="startSite">
            <Header/>
            <FormUserName onLogIn={handleLogIn}/>
        </div>) : 
        (<MainContent/>)}

        
    {/* <div className="startSite">
      <Header />

      {!isLoggedIn ? ( <FormUserName onLogIn={handleLogIn}/>) 
      : (<MainContent/>)}
     
    </div> */}
    </div>
  );
}

export default StartSite;
