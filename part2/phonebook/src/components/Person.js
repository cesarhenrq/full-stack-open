import DeletePersonButton from "./DeletePersonButton";

const Person = ({ person, onClick }) => (
  <p>
    {person.name} {person.number}{" "}
    <DeletePersonButton person={person} onClick={onClick} />
    <br />
  </p>
);

export default Person;
