import { Username } from "../context/Username.jsx";
import { useContext } from "react";

function MainContent() {
  const { name} = useContext(Username);

  return (
    <div className="maincontent-bg">
      <div className="maincontent-container">
        <h3>hai {name}</h3>
        <p>The API renders here</p>
      </div>
    </div>
  );
}

export default MainContent;
