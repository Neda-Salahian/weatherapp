import { useContext, useState, useEffect } from "react";
import { data } from "../data/pictureData";
import Search from "./Search.jsx";
import { Username } from "../context/Username.jsx";
import WeatherContext from "../context/WeatherContext.jsx";
import "../App.css";
import defaultBackground from "../assets/default.jpg";

const CurrentWeather = ({ onLogOut }) => {
  const [catchWeather, setCatchWeather] = useState(null);
  const { name } = useContext(Username);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "d54a96e0b4517e304ec98021394e455b";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    // Get the user's current location by default
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
        setError(
          "Error getting location. Please use the search to enter a city."
        );
      }
    );
  }, [longitude, latitude]);

  const fetchWeatherData = async (lat, lon) => {
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setCatchWeather(data);
      setError(null);
    } catch (error) {
      console.error(`Error in the request: ${error.message}`);
      setError("Error fetching weather data.");
    }
  };

  const handleSearch = (city) => {
    if (city.trim() !== "") {
      fetchWeatherDataByCity(city);
    } else {
      setError("Please enter a valid city name.");
    }
  };

  const fetchWeatherDataByCity = async (city) => {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          setError(`City '${city}' not found.`);
        } else {
          throw new Error(`Request failed: ${response.status}`);
        }
      } else {
        const data = await response.json();
        setCatchWeather(data);
        setError(null);
      }
    } catch (error) {
      console.error(`Error in the request: ${error.message}`);
      setError("Error fetching weather data.");
    }
  };

  let weatherBack;
  let transitionStyle ;
  if (catchWeather) {
    const description = catchWeather?.weather?.[0]?.description;
    const foundItem = data.find((item) => item.name === description);

    if (foundItem && foundItem.pic) {
      weatherBack = `url(${foundItem.pic})`;
      transitionStyle = "background-image all 0.2s ease-in-out";
    } else {
      weatherBack = "url(" + defaultBackground + ")";
      transitionStyle = "background-image all 0.2s ease-in-out";
      
    }
  }
  return (
    <div
    className="display-weather"
      style={{
        backgroundImage: weatherBack,
        transition: transitionStyle,
      }}
    >
      <WeatherContext.Provider value={{ catchWeather, setCatchWeather }}>
        <div className="left-part">
          <h3 className="leftpart-greeting">Hai {name}. Have a good day ! </h3>

          {!catchWeather ? (
            <p className="containerStyle" style={{ color: "black" }}>
              {error ? (
                error
              ) : (
                <span className="imageStyle" style={{ color: "black" }}>
                  {error ? (
                    error
                  ) : (
                    <img
                      src="../src/data/icons8-loading-100.png"
                      alt="Loading"
                    />
                  )}
                </span>
              )}
            </p>
          ) : (
            <div className="leftpart-weatherinfo">
              <h2>Weather Information</h2>

              <div className="leftpart-weatherinfo-detail">
                <h4 className="city">{catchWeather.name}</h4>
                <h4 className="temperature">
                  {catchWeather.main && catchWeather.main.temp.toFixed(0)}°C
                </h4>
                <div className="weather-condition">
                  <h4>Country: {catchWeather.sys.country}</h4> 
                  <p style={{ display: "flex" }}>
                    Weather Condition:{" "} 
                    {catchWeather.weather &&
                      catchWeather.weather[0].description}
                    <img
                      src={`http://openweathermap.org/img/w/${catchWeather.weather[0].icon}.png`}
                      alt="weather icon"
                    />
                  </p>

                  <p>
                    Feels Like:{" "}
                    {catchWeather.main &&
                      catchWeather.main.feels_like.toFixed(0)}
                    °C
                  </p>
                  <p>
                    Wind Speed: {catchWeather.wind && catchWeather.wind.speed}{" "}
                    m/s
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right-part">
          <Search onSearch={handleSearch} onLogOut={onLogOut} />
        </div>
      </WeatherContext.Provider>
    </div>
  );
};

export default CurrentWeather;
