import { useState, useEffect } from "react";

import Title from "./components/Title";

import Filter from "./components/Filter";

import FormPerson from "./components/FormPerson";

import Persons from "./components/Persons";

import personService from "./services/persons";

import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  const [filter, setFilter] = useState("");

  const [notification, setNotification] = useState(null);

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

    const personIndex = persons.findIndex(
      (person) => person.name === newContact.name
    );

    const isAlreadyAdded = persons.some(
      (person) => person.name === newContact.name
    );

    const hasDifferentNumber =
      persons[personIndex]?.number !== newContact.number;

    if (isAlreadyAdded && hasDifferentNumber) {
      const shouldUpdate = window.confirm(
        `${newContact.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (shouldUpdate) {
        personService
          .update(persons[personIndex].id, person)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== persons[personIndex].id ? person : returnedPerson
              )
            );

            setNotification({
              message: `Updated ${returnedPerson.name}`,
              error: false,
            });

            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${persons[personIndex].name} has already been removed from server`,
              error: true,
            });

            setTimeout(() => {
              setNotification(null);
            }, 5000);

            setPersons(
              persons.filter((person) => person.id !== persons[personIndex].id)
            );
          });
      }
      return;
    } else if (isAlreadyAdded && !hasDifferentNumber) {
      alert(`${newContact.name} is already added to phonebook`);
      return;
    }

    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNotification({
        message: `Added ${returnedPerson.name}`,
        error: false,
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setNewContact({
        name: "",
        number: "",
      });
    });
  };

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${personToDelete.name} has already been removed from server`,
            error: true,
          });

          setTimeout(() => {
            setNotification(null);
          }, 5000);

          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
        });
    }
  };

  return (
    <div>
      <Title text='Phonebook' />
      <Notification notification={notification} />
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
