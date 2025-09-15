import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Mainweather from "./components/Mainweather";
import axios from "axios";
import FiveDayForecast from "./components/fiveday";
import TodayHighlights from "./components/todayhighlights";
import FiveHourWeather from "./components/FiveHourWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  const API_KEY = "9e0bb87f9bd03a8ef7b909baa28aaa1b";

  const fetchAirQualityData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) =>
        console.error("Error fetching the air quality data:", error)
      );
  };

  const fetchFiveDayForecast = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setFiveDayForecast(response.data);
      })
      .catch((error) =>
        console.error("Error fetching the 5-day forecast:", error)
      );
  };

  const fetchWeatherByCity = (cityName) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setCity(data.name);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        fetchFiveDayForecast(data.coord.lat, data.coord.lon);
      })
      .catch((error) =>
        console.error("Error fetching the weather data:", error)
      );
  };

  const fetchWeatherByCoords = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setCity(data.name);
        fetchAirQualityData(lat, lon);
        fetchFiveDayForecast(lat, lon);
      })
      .catch((error) =>
        console.error("Error fetching weather by coordinates:", error)
      );
  };

  const handleSearch = (query) => {
    if (typeof query === "string") {
      fetchWeatherByCity(query);
    } else if (query.lat && query.lon) {
      fetchWeatherByCoords(query.lat, query.lon);
    }
  };

  useEffect(() => {
    fetchWeatherByCity(city);
  }, []);

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <Mainweather weatherData={weatherData} />
            <p
              style={{
                fontWeight: "700",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              5 Days Forecast
            </p>
            {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "0.5",
              gap: "20px",
            }}
          >
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
            <FiveHourWeather
              lat={weatherData?.coord?.lat}
              lon={weatherData?.coord?.lon}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
