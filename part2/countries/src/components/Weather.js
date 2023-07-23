import React from "react";

const Weather = ({ weather }) => {
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div>Temperature {weather.current.temp_c}° Celsius</div>
      <img src={weather.current.condition.icon} alt='weather icon' />
      <div>wind {(weather.current.wind_kph / 3.6).toFixed(2)} m/s</div>
    </div>
  );
};

export default Weather;
