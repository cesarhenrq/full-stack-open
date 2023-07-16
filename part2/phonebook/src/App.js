import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const FormPerson = ({ onSubmit, value, onChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={value} onChange={onChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

const Person = ({ person }) => (
  <p>
    {person.name} <br />
  </p>
);

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (event) => setNewName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(person));

    setNewName("");
  };

  return (
    <div>
      <Title text='Phonebook' />
      <FormPerson
        onSubmit={handleSubmit}
        value={newName}
        onChange={handleChange}
      />
      <Title text='Numbers' />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
