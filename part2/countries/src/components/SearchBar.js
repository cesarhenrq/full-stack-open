import React from "react";

const SearchBar = ({ query, onQueryChange }) => {
  return (
    <>
      find countries{"  "}
      <input
        type='text'
        placeholder='Search...'
        value={query}
        onChange={onQueryChange}
      />
    </>
  );
};

export default SearchBar;
