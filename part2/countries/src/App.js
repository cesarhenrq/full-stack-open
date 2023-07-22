import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Country from "./components/Country";

import countryService from "./services/countries";
import Notification from "./components/Notification";
import { CountriesList } from "./components/CountriesList";

const App = () => {
  const [query, setQuery] = useState("");

  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState(null);

  const onQueryChange = (event) => {
    setQuery(event.target.value);

    if (country) {
      setCountry(null);
    }
  };

  const onShowClick = (country) => {
    setCountry(country);
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
    </div>
  );
};

export default App;
