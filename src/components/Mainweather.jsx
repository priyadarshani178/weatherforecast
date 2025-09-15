import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Mainweather = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "city not available";
  const countryName = weatherData?.sys?.country || "country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return (
        <WbSunnyIcon
          style={{ marginLeft: "10px", fontSize: "3rem", color: "orange" }}
        />
      );
    } else if (temperatureCelsius < 10) {
      return (
        <AcUnitIcon
          style={{ marginLeft: "10px", fontSize: "3rem", color: "blue" }}
        />
      );
    } else {
      return (
        <CloudIcon
          style={{ marginLeft: "10px", fontSize: "2.5rem", color: "gray" }}
        />
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F7D6D0",
        color: "#2C3E50",
        borderRadius: "1rem",
        width: "155px",
        padding: "30px",
      }}
    >
      <div style={{ fontSize: "16px" }}>Currently</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "38px",
          fontWeight: "bold",
        }}
      >
        {temperatureCelsius}°C{renderTemperatureIcon()}
      </div>
      <div style={{ fontSize: "18px", marginTop: "5px", fontWeight: "42" }}>
        {weatherDDescription}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DateRangeIcon />
          {currentDate}
        </div>
        <div
          style={{ marginTop: "4px", display: "flex", alignItems: "center" }}
        >
          <LocationOnIcon />
          {cityName},{countryName}
        </div>
      </div>
    </div>
  );
};

export default Mainweather;
