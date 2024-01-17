import React, { useState, useContext } from 'react';
import '../App.css';
import WeatherContext from '../context/WeatherContext';

function Search() {
  const {catchWeather, setCatchWeather} = useContext(WeatherContext)
  
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  const apiKey = 'd54a96e0b4517e304ec98021394e455b';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherDataByCity(city);
    }
    setCity("")
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
            name='text'
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default Search;