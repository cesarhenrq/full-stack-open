import Person from "./Person";

const Persons = ({ persons, filter, onClick }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  const personsToShow = filter ? filteredPersons : persons;

  return (
    <div>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} onClick={onClick} />
      ))}
    </div>
  );
};

export default Persons;
