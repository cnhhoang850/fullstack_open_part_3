const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
`mongodb+srv://fullstack:${password}@cluster0-8bd49.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
console.log('connect to mongodb')
const personSchema = new mongoose.Schema({
  name: String,
  num: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

  const person = new Person({
    name: process.argv[3],
    num: process.argv[4]
  })

  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => console.log(p.name, p.num))
    mongoose.connection.close()
  })

}
