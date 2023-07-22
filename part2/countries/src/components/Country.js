import React from "react";

const Country = ({ countries, query }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  const hasManyCountries = filteredCountries.length > 10 && query.length > 0;

  if (hasManyCountries) {
    return <div>Too many matches, specify another filter</div>;
  }

  const hasTenOrLessCountries =
    filteredCountries.length <= 10 &&
    filteredCountries.length !== 1 &&
    query.length > 0;

  if (hasTenOrLessCountries) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    );
  }

  const hasOneCountry = filteredCountries.length === 1;

  if (hasOneCountry) {
    const country = filteredCountries[0];

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>

        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={country.name.common} width='200' />
      </div>
    );
  }
};

export default Country;
