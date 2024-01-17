import { useState, useContext } from "react";
import "../App.css";
import WeatherContext from "../context/WeatherContext";

function Search({ onLogOut }) {
  const { catchWeather, setCatchWeather } = useContext(WeatherContext);

  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const apiKey = "d54a96e0b4517e304ec98021394e455b";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherDataByCity(city);
    }
    setCity("");
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
        setError("");
      }
    } catch (error) {
      console.error(`Error in the request: ${error.message}`);
      setError("Error fetching weather data.");
    }
  };

  return (
    <div className="search-section">
      <div className="top-searchsection">
        <div className="right-section-title">Search your city</div>
        <form onSubmit={handleSubmit} className="search-form">
          <label className="city-field">
          </label>
            <input
              type="text"
              value={city}
              name="text"
              placeholder="Search City..."
              onChange={(e) => setCity(e.target.value)}
            />
        
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <button onClick={onLogOut} className="bottom-searchsection">
        Log Out
      </button>
    </div>
  );
}

export default Search;
