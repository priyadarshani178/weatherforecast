import React, { useState, useEffect } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toFixed(2),
            longitude: position.coords.longitude.toFixed(2),
          });
        },
        (err) => {
          setError("Location access denied");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  const handleLocationSearch = () => {
    if (location.latitude && location.longitude) {
      onSearch({ lat: location.latitude, lon: location.longitude });
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
        padding: "10px 35px 10px 40px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FilterDramaIcon />
        <p style={{ fontWeight: "bold", fontSize: "20px", margin: 0 }}>
          Weather Forecast
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <TextField
          variant="outlined"
          placeholder="Search city"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            width: "20rem",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{
            borderRadius: "6px",
            backgroundColor: "#ADD8E6",
            color: "#2C3E50",
            fontWeight: "bold",
          }}
        >
          Search
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={handleLocationSearch}
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          backgroundColor: "#ADD8E6",
          height: "35px",
          width: "250px",
          color: "#2C3E50",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <GpsFixedIcon />
          {"Current location"}
      </Button>
    </nav>
  );
};

export default Navbar;