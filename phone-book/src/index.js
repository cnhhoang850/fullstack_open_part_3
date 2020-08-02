import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/form'
import Book from './components/book'
import Heading from './components/heading'
import axios from 'axios'
import phoneBook from './phone'
import './index.css'
import Notification from './components/noti'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('') 
  const [ filter, setFilter] = useState('')
  const [notiMessage, setNotiMesage] = useState('')

  useEffect(() => {
    phoneBook
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const toShow = filter === '' ? 
  persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()
    let todo = true

    persons.forEach(person => {

      if (person.name === newName && person.num === newNum) {
        window.alert(`${newName} is already in phonebook `)
        todo = false
      } else if (person.num === newNum) {
        window.alert(`${newNum} is already in phonebook `)
        todo = false
      } else if (person.name === newName && person.num !== newNum) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, num: newNum}
        
        let toChange = false
        if (window.confirm(`${changedPerson.name} is already added to phonebook ,replace the old number with the new one?`)) {
        toChange = true
      }
        if (toChange) {
        phoneBook
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setNotiMesage(`${response.data.name} number is changed.`)
            setTimeout(() => {
              setNotiMesage(null)
            }, 5000)
            setPersons(persons.map(
              person => person.id !== changedPerson.id ? person : response.data))
            setNewName('') 
            setNewNum('')
          })
          .catch(error => {
            setNotiMesage(`${error.response.data.error}`)
            setTimeout(() => {
              setNotiMesage(null)
            }, 5000)
            setNewName('') 
            setNewNum('')
          })
          
          todo = false
        } else {
          todo = false
        }
      }
    })
    
    if (todo === false) {
      return
    }

    if (newName === '' || newNum === '') {
      todo = false 
      window.alert(`please add both name and number `)
    }

    if (todo) {
      phoneBook
        .create({name:newName, num:newNum})
        .then(response => {
          setNotiMesage(`${response.data.name} is added to the server.`)
          setTimeout(() => {
            setNotiMesage(null)
          }, 5000) 

          setPersons(persons.concat(response.data))

          setNewName('') 
          setNewNum('')
        })  
        .catch(error => {
          setNotiMesage(`${error.response.data.error}`)
          setTimeout(() => {
            setNotiMesage(null)
          }, 5000)
          setNewName('') 
          setNewNum('')
        })
    }

  }

  const handleDelete = (id, name) => { 
    let todo = false
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      todo = true
    }
    if (todo) {
      phoneBook
      .remove(id)
      .then(response => {
        setNotiMesage(`${name}'s number is deleted.`)
        setTimeout(() => {
          setNotiMesage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert("something went wrong")
      })
    }
  }
  
  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }


  return (
    <div>
      <Heading tag="Phonebook" />
      {notiMessage === '' ? <></> : <Notification message={notiMessage}/>}
      <Form 
        handleSubmit={handleSubmit} 
        filter={filter} 
        handleFilter={handleFilterChange} 
        newName={newName}
        handleName={handleNameChange}
        newNum={newNum}
        handleNum={handleNumChange}
      />      
      <Heading tag="Numbers" />
      <Book people={toShow} deleteHandle={handleDelete} />
      ...
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

