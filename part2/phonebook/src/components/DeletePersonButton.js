import React from "react";

const DeletePersonButton = ({ person, onClick }) => {
  return (
    <button
      onClick={() => {
        onClick(person);
      }}
    >
      delete
    </button>
  );
};

export default DeletePersonButton;
