import { useState } from "react";

const Title = ({ text }) => <h2>{text}</h2>;

const FormPerson = ({ onSubmit, fields, onChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={fields.name} onChange={onChange} name='name' />
    </div>
    <div>
      number: <input value={fields.number} onChange={onChange} name='number' />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
    <br />
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  const handleChange = (event) =>
    setNewContact({ ...newContact, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
      ...newContact,
    };

    if (persons.some((person) => person.name === newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(person));

    setNewContact({
      name: "",
      number: "",
    });
  };

  return (
    <div>
      <Title text='Phonebook' />
      <FormPerson
        onSubmit={handleSubmit}
        fields={newContact}
        onChange={handleChange}
      />
      <Title text='Numbers' />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
