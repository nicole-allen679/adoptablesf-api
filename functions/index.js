const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
//const bodyParser = require('body-parser')
const { getAllPets, newPet } = require('./src/index')
const app = express()

app.use(cors())

app.get('/pets', getAllPets)
app.post('/pets', newPet)

exports.app = functions.https.onRequest(app)
