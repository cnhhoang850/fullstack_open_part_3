const express = require('express')
const { request, response } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const middleware = require('./middleware/error')

app.use(cors())
app.use(express.static('build'))
morgan.token('body', function (req,res) {return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(middleware.requestLogger)


app.get('/info', (req, res) => {
    const date = new Date()
    res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deletedPerson => {
            if (deletedPerson) {
                res.status(204).send({deleted: deletedPerson})
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))

    res.status(204).end()
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    if (!body) {
        res.status(400).send({error: 'no content received'})
    }

    const changedPerson = {
        name: body.name, 
        num: body.num 

    }

    Person.findByIdAndUpdate(id, changedPerson, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
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

    const newPerson = new Person({
        name: body.name,
        num: body.num
    })

    newPerson.save()
        .then(response =>res.json(response.toJSON()) )
        .catch(error => next(error))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})