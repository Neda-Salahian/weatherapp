import { useContext, useEffect, useState } from "react";
import { data } from "../data/pictureData";
import "./currentweather.css";
import Test from "./Test";
import CatchDetails from "../context/CatchDetails";

const CurrentWeather = () => {
  const { object ,setObject} = useContext(CatchDetails)

  // Bild für das jetzige Wetter
  const weatherBack = `url(${data.find((item) => item.name === "moderate cloudy")?.pic})`;
  // Bild für das jetzige Wetter
  return (
    <div className="display-weather" style={{ backgroundImage: weatherBack }}>
        <h3 className="icon">
       icon  
      </h3> 
      
      <div className="top-part">
        <h3>Willkomen Username. Haben Sie einen schönen Tag</h3>
      
      <div className="bottom-part">
        <h2>{object.sys ? object.sys.country : <></>}</h2>
        <h2>{object.name}</h2>
        <p>Wetterverhältnisse</p>
      </div>
      </div>
    {console.log(object)}
    
      <Test /> 
    </div>
  );
};

export default CurrentWeather;
