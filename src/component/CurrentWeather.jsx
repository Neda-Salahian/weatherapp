import { useContext, useState } from "react";
import { data } from "../data/pictureData";
import "../currentweather.css";
import Search from "./Search.jsx";
import { Username } from "../context/Username.jsx";
import WeatherContext from "../context/WeatherContext.jsx";
const CurrentWeather = () => {
  const [catchWeather, setCatchWeather] = useState([]);
  const { name } = useContext(Username);

  // Bild für das jetzige Wetterr
  const weatherBack = `url(${
    data.find((item) => item.name === "moderate cloudy")?.pic
  })`;
  // Bild für das jetzige Wetter


  return (
    <div className="display-weather" style={{ backgroundImage: weatherBack }}>
      <WeatherContext.Provider value={{ catchWeather, setCatchWeather }}>
        <div className="top-part">
          <h3>Willkomen {name}. Haben Sie einen schönen Tag</h3>
          
          
      {!catchWeather ? <p style={{ color: 'red' }}>Error, City not real</p> : (
        <div>
          <h2>Weather Information</h2>
          <p>City: {catchWeather.name}</p>
          <p>Temperature: {catchWeather.main && catchWeather.main.temp}°C</p>
          <p>Weather Condition: {catchWeather.weather && catchWeather.weather[0].description}</p>
          <p>Feels Like: {catchWeather.main && catchWeather.main.feels_like}°C</p>
          <p>Wind Speed: {catchWeather.wind && catchWeather.wind.speed} m/s</p>
        </div>
      )}
          <div className="bottom-part"></div>
        </div>
        <Search />
      </WeatherContext.Provider>
    </div>
  );
};

export default CurrentWeather;
