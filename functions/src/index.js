const admin = require('firebase-admin')
const { connectToFB } = require('./firestore')

exports.getAllPets = (req, res) => {
  const db = connectToFB()
  db.collection('pets')
    .get()
    .then((collection) => {
      let allPets = []
      collection.forEach((doc) => {
        let pet = doc.data()
        pet.id = doc.id
        allPets.push(pet)
      })
      res.send(allPets)
    })
    .catch((err) => res.send('Error getting Pets', +err.message))
}

exports.newPet = (req, res) => {
  const db = connectToFB()
  const newData = req.body
  db.collection('pets')
    .add(newData)
    .then(() => this.getAllPets(req, res))
    .catch((err) => res.send('Error creating new pet', +err.message))
}
