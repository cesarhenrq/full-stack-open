import { useState } from "react";

const Title = ({ text }) => <h2>{text}</h2>;

const FormFilter = ({ value, onChange }) => (
  <div>
    filter shown with{" "}
    <input value={value} onChange={(event) => onChange(event.target.value)} />
  </div>
);

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

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  const personsToShow = filter ? filteredPersons : persons;

  return (
    <div>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  const [filter, setFilter] = useState("");

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
      <FormFilter value={filter} onChange={setFilter} />
      <Title text='Add a new' />
      <FormPerson
        onSubmit={handleSubmit}
        fields={newContact}
        onChange={handleChange}
      />
      <Title text='Numbers' />
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
