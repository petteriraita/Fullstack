const express = require('express')
const app = express()
app.use(express.json())




generateID = () => {
  const newid = Math.floor(Math.random() * 100000000)
  return String(newid) 
}

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/test/:id', (req, res) => {
  res.send(`You gave me id: ${req.params.id}`)
})


app.delete('/api/persons/:num', (req, res) => {
  const num = req.params.num
  const filteredPersons = persons.filter(p => 
    p.id !== num
  )
  return res.json(filteredPersons)
})
app.get('/api/persons', (request, response) => {
    return response.json(persons)
}
)
app.post('/api/persons/', (req, res) => {

  if (!req.body.name) {
    return res.status(400).json({
      error: "no name given"
    })
  }
  if (!req.body.number) {
    return res.status(400).json({
      error: "no number given"
    })
  }
  const nrofduplicates = persons.filter(p =>
    p.name === req.body.name
  ).length
  if (nrofduplicates > 0) {
    return res.status(400).json({
      error: "name already exists"
    })
  }
  const newperson = {
    id: generateID(),
    name: req.body.name,
    number: req.body.number
  }
  // persons.concat(newperson)
  persons.push(newperson)
  res.json(persons)
})

app.get('/api/persons/:num', (request, response) => {
  const num = request.params.num
  
  // // you cannot send 2 responses, since those flush the headers and they cant bbe changed
  // // response.send('<p>some html</p>')

  const filteredPersons = persons.filter(p => p.id === num)
  console.log('filteredPersons.length: ', filteredPersons.length);
  if (filteredPersons.length === 1) {
        return response.json(filteredPersons)
  
  }
  else {
    return response.status(404).json({
      error:'the id number didnt fit any single person'
    })
  }
  // response.send(`You gave me the id: ${request.params.num}`)
})


app.get('/info', (request, response) => {
  const curdate = new Date().toString()
  const nrofpeople = persons.length
  const html = `
  <div> 
    <p>Phoneobook has info for ${nrofpeople} people<\p> 
    <p>${curdate}<\p>
    <\div>
  `
  response.send(html)
}
)


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

