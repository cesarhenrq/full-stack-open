import React from "react";

const CountriesList = ({ countries, onShowClick }) => {
  return (
    <>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common} {"  "}
          <button onClick={() => onShowClick(country)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default CountriesList;
