import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const apiKey = 'd54a96e0b4517e304ec98021394e455b';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
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
      setWeatherData(data);
      setError('');
    } catch (error) {
      console.error(`Error in the request: ${error.message}`);
      setError('Error fetching weather data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherDataByCity(city);
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
        setWeatherData(data);
        setError('');
      }
    } catch (error) {
      console.error(`Error in the request: ${error.message}`);
      setError('Error fetching weather data.');
    }
  };

  return (
    <>
      <div>Weather App</div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && !error && (
        <div>
          <h2>Weather Information</h2>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main && weatherData.main.temp}°C</p>
          <p>Weather Condition: {weatherData.weather && weatherData.weather[0].description}</p>
          <p>Feels Like: {weatherData.main && weatherData.main.feels_like}°C</p>
          <p>Wind Speed: {weatherData.wind && weatherData.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
}

export default App;
