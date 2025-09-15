import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "68c2428174a6b9980b2af570"; 

const FiveHourWeather = ({ lat, lon }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherAPIHistory = async () => {
      setLoading(true);
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const location = `${lat},${lon}`;

      try {
        const res = await axios.get(
          'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=CD56iDE1dRKQUVxx5DJrAFosxjv1RvmC'
        );

        const allHours = res.data.forecast.forecastday[0].hour;
        const currentHour = now.getHours();
        const start = Math.max(0, currentHour - 5);
        const pastFive = allHours.slice(start, currentHour);

        setHourlyData(
          pastFive.map((hour) => ({
            time: hour.time.split(" ")[1],
            temp: hour.temp_c,
            desc: hour.condition.text,
          }))
        );
      } catch (err) {
        console.error("WeatherAPI error:", err);
        setHourlyData([]);
      }

      setLoading(false);
    };

    if (lat && lon) {
      fetchWeatherAPIHistory();
    }
  }, [lat, lon]);

  if (loading) return <div>Loading past 5 hours weather...</div>;
  if (!hourlyData.length) return <div>No data available for past 5 hours.</div>;

  return (
    <div
      style={{
        backgroundColor: "#ADD8E6", 
        borderRadius: "19px",
        padding: "21px",
        width: "100%",
        maxWidth: "858px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          backgroundColor: "#F7D6D0", 
          color: "#2C3E50",
          borderRadius: "19px",
          padding: "10px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Past 5 Hours Weather
        </div>
        {hourlyData.map((hour, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
              padding: "10px 0",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              fontSize: "15px",
            }}
          >
            <span>{hour.time}</span>
            <span>{Math.round(hour.temp)}°C</span>
            <span>{hour.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveHourWeather;
