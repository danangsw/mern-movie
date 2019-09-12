const mongoose = require('mongoose')

const MONGO_USERNAME = 'superadmin'
const MONGO_PASSWORD = 'superadmin123'
const MONGO_HOSTNAME = '127.0.0.1'
const MONGO_PORT = '27017'
const MONGO_DB = 'cinema'

const dburl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
    .connect(dburl, {useNewUrlParser: true})
    .then(() => {
        console.log('mongoDB is connected...')
    })
    .catch(e => {
        console.error('Connection error: ', e.message)
    })

const db = mongoose.connection

module.exports = db
