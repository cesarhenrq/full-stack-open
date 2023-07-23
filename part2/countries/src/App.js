import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Country from "./components/Country";
import Notification from "./components/Notification";
import CountriesList from "./components/CountriesList";
import Weather from "./components/Weather";

import countryService from "./services/countries";
import weatherService from "./services/weather";

const App = () => {
  const [query, setQuery] = useState("");

  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState(null);

  const [weather, setWeather] = useState(null);

  const onQueryChange = (event) => {
    setQuery(event.target.value);

    if (country || weather) {
      setCountry(null);
      setWeather(null);
    }
  };

  const onShowClick = (country) => {
    setCountry(country);

    const fetchWeather = () => {
      weatherService.getWeather(country.capital[0]).then((weather) => {
        setWeather(weather);
      });
    };

    fetchWeather();
  };

  useEffect(() => {
    const fetchCountries = () => {
      countryService.getAll().then((countries) => {
        setCountries(countries);
      });
    };

    fetchCountries();
  }, []);

  let filteredCountries = [];

  const hasCountries = countries.length > 0;

  if (hasCountries) {
    filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }

  const showNotification = filteredCountries.length > 10 && query.length > 0;

  const showCountriesList =
    filteredCountries.length <= 10 &&
    filteredCountries.length !== 1 &&
    query.length > 0;

  const showCountry =
    country &&
    query.length > 0 &&
    !showNotification &&
    filteredCountries.length !== 0;

  return (
    <div>
      <SearchBar query={query} onQueryChange={onQueryChange} />
      {showNotification && <Notification />}
      {showCountriesList && (
        <CountriesList
          countries={filteredCountries}
          onShowClick={onShowClick}
        />
      )}
      {showCountry && <Country country={country} />}
      {weather && <Weather weather={weather} />}
    </div>
  );
};

export default App;
