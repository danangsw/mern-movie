const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
// import db/index.js
const db = require('./db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// add database connection response
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})