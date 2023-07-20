import { useState, useEffect } from "react";

import Title from "./components/Title";

import Filter from "./components/Filter";

import FormPerson from "./components/FormPerson";

import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));

      setNewContact({
        name: "",
        number: "",
      });
    });
  };

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.deletePerson(personToDelete.id).then(() => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      });
    }
  };

  return (
    <div>
      <Title text='Phonebook' />
      <Filter value={filter} onChange={setFilter} />
      <Title text='Add a new' />
      <FormPerson
        onSubmit={handleSubmit}
        fields={newContact}
        onChange={handleChange}
      />
      <Title text='Numbers' />
      <Persons persons={persons} filter={filter} onClick={handleDelete} />
    </div>
  );
};

export default App;
