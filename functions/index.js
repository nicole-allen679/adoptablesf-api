const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
//const bodyParser = require('body-parser')
const { getAllPets, newPet, newUser, updatePet, deletePet } = require('./src/index')
const app = express()

app.use(cors())

app.get('/pets', getAllPets)
app.post('/pets', newPet)
app.post('/users', newUser)
app.patch('/pets/:petId', updatePet)
app.delete('/pets/:petId', deletePet)

exports.app = functions.https.onRequest(app)
