import React from "react";

import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
      <Total total={total} />
    </>
  );
};

export default Content;
