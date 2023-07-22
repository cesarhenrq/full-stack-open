import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Country from "./components/Country";

import countryService from "./services/countries";

const App = () => {
  const [query, setQuery] = useState("");

  const [countries, setCountries] = useState([]);

  const onQueryChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchCountries = () => {
      countryService.getAll().then((countries) => {
        setCountries(countries);
      });
    };

    fetchCountries();
  }, []);

  const showCountry = countries.length > 0;

  return (
    <div>
      <SearchBar query={query} onQueryChange={onQueryChange} />
      {showCountry && <Country countries={countries} query={query} />}
    </div>
  );
};

export default App;
