import CurrentWeather from "./CurrentWeather";
function MainContent({onLogOut}) {
  return (
    <div className="maincontent-bg">
      <div className="maincontent-container">
      </div>
      <CurrentWeather />  
      <button onClick={onLogOut}>Log Out</button>
    </div>
  );
}

export default MainContent;
