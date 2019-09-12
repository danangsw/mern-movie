const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
// import db/index.js
const db = require('./db')
// import movie router
const MovieRouter = require('./routes/movie-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// add database connection response
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

// Set app to use movie router
app.use('/api/v0.1', MovieRouter)

// The 404 Route (ALWAYS Keep this as the last route)
app.all('*', function (req, res) {
    res.status(404).json({ message: "Not found!" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})