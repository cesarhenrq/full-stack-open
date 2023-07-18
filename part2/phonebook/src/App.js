import { useState, useEffect } from 'react';

import axios from 'axios';

import Title from './components/Title';

import Filter from './components/Filter';

import FormPerson from './components/FormPerson';

import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleChange = event =>
    setNewContact({ ...newContact, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    const person = {
      ...newContact,
    };

    if (persons.some(person => person.name === newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(person));

    setNewContact({
      name: '',
      number: '',
    });
  };

  return (
    <div>
      <Title text="Phonebook" />
      <Filter value={filter} onChange={setFilter} />
      <Title text="Add a new" />
      <FormPerson
        onSubmit={handleSubmit}
        fields={newContact}
        onChange={handleChange}
      />
      <Title text="Numbers" />
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
