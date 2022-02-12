const express = require('express')
const app = express()
const port = 3000
// Connect database
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
let  db = mongoose.connection;

let personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

let Person = mongoose.model("Person", personSchema);

let person1  = new Person({name: 'Venkat Pamulapati', age: 20, nationality: 'Indiant'})

person1.save((err, person) => {
    if (err) return console.error(err);
    console.log(person.name + " saved to person collection.");
});

app.get('/person', (req, res) => {
    Person.find({name:"Venkat Pamulapati"}, function (err, persons) {
        if(err) return handleError(err);
        res.status(200).send(persons);
    })})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})