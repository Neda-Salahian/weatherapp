import { Username } from "../context/Username.jsx";
import { useContext } from "react";


function MainContent({onLogOut}) {
  const { name } = useContext(Username);

  return (
    <div className="maincontent-bg">
      <div className="maincontent-container">
        <h3>Hi {name}, Have a nice day!</h3>
        <p>The API renders here</p>
      </div>

      <div className="fetch-section">
      </div>

      <button onClick={onLogOut}>Log Out</button>
    </div>
  );
}

export default MainContent;
