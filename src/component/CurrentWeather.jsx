import React, { useContext, useState, useEffect } from "react";
import { data } from "../data/pictureData";
import "../currentweather.css";
import Search from "./Search.jsx";
import { Username } from "../context/Username.jsx";
import WeatherContext from "../context/WeatherContext.jsx";

const CurrentWeather = () => {
  const [catchWeather, setCatchWeather] = useState(null);
  const { name } = useContext(Username);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'd54a96e0b4517e304ec98021394e455b';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

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
        setError('Error getting location. Please use the search to enter a city.');
      }
    );
  }, []);

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
      setError('Error fetching weather data.');
    }
  };

  const handleSearch = (city) => {
    if (city.trim() !== '') {
      fetchWeatherDataByCity(city);
    } else {
      setError('Please enter a valid city name.');
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
      setError('Error fetching weather data.');
    }
  };

  // Bild für das jetzige Wetter
  const weatherBack = `url(${
    data.find((item) => item.name === "moderate cloudy")?.pic
  })`;
  // Bild für das jetzige Wetter

  return (
    <div className="display-weather" style={{ backgroundImage: weatherBack }}>
      <WeatherContext.Provider value={{ catchWeather, setCatchWeather }}>
        <div className="top-part">
          <h3>Willkommen {name}. Haben Sie einen schönen Tag</h3>

          {!catchWeather ? (
            <p style={{ color: 'black' }}>{error || 'Loading....'}</p>
          ) : (
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
        <Search onSearch={handleSearch} />
      </WeatherContext.Provider>
    </div>
  );
};

export default CurrentWeather;
