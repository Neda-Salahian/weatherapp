import CurrentWeather from "./CurrentWeather";
function MainContent({onLogOut}) {
  return (
    <div className="maincontent">
      
      <CurrentWeather onLogOut={onLogOut} />  
      
      
    </div>
  );
}

export default MainContent;
