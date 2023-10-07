import { useEffect, useState } from "react"
import personService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [number, setNumber] = useState(0)
  const [filter, setFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    personService.getAll().then((personsData) => setPersons(personsData))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const newEntry = { name: newName, number }
    const person = persons.find((per) => per.name === newName)

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number }

        personService
          .update(person.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((per) => (per.name !== newName ? per : response))
            )
          })
          .catch((error) => {
            setMessage(
              `Information of ${person.name} has already been removed from the server`
            )
            setError(true)
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 5000)
          })
      }
      return
    } else {
      personService.create(newEntry).then((returnedData) => {
        setPersons(persons.concat(returnedData))
        setMessage(`Added ${newEntry.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

    setFilteredPersons(filteredPersons)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteOne(id).then((data) => {
        const newData = persons.filter((per) => per.id !== id)

        setPersons(newData)
      })
    }

    return
  }

  const personsToRender = filter.length > 0 ? filteredPersons : persons

  return (
    <div>
      {message && <Notification message={message} error={error} />}
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {personsToRender.length > 0 &&
        personsToRender.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={() => handleDelete(person.id, person.name)}
          />
        ))}
    </div>
  )
}

export default App
