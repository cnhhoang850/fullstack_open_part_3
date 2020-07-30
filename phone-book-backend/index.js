const express = require('express')
const { request, response } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
morgan.token('body', function (req,res) {return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "name": "Ada Lovelace",
        "num": "0907521432",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "num": "4321414 4312412",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "num": "39-23-6423122",
        "id": 4
      },
      {
        "name": "fdsafsda",
        "num": "fdsafsda",
        "id": 5
      }
]

const generateId = () => {
    let rId = Math.floor(Math.random() * 100)
    while (persons.find(p => p.id === rId)) {
        rId= Math.floor(Math.random() * 100)
    }
    return rId
}


app.get('/info', (req, res) => {
    const date = new Date()
    res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person){
        res.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body

    let person = persons.find(p => p.id === id)

    const newPerson = {
        name: body.name || person.name,
        num: body.num || person.num,
        id: id
    }

    if (person === newPerson) {
        return res.status(400).json({
            error: 'nothing changed compared to old person'
        })
    }
    persons = persons.filter(p => p.id !== id)
    persons = persons.concat(newPerson)
    res.json(newPerson)
})


app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name || !body.num) {
        return res.status(400).json({
            error: 'must include name & num'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
        error: 'person already in phonebook'})
    }

    const newPerson = {
        name: body.name,
        num: body.num,
        id: generateId()
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})