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

exports.getSinglePet = (req, res) => {
  const db = connectToFB()
  const { petId } = req.params
  db.collection('pets')
  .doc(petId)
  .get()
  .then(singlePet => res.send(singlePet.data()))
}

exports.newPet = (req, res) => {
  const db = connectToFB()
  const newData = req.body
  db.collection('pets')
    .add(newData)
    .then(() => this.getAllPets(req, res))
    .catch((err) => res.send('Error creating new pet', +err.message))
}

exports.newUser = (req, res) => {
  const db = connectToFB()
  const user = req.body
  db.collection('users')
    .add(user)
    .then(() => res.send('user created successfully'))
    .catch((err) => res.send('error creating user', +err.message))
}


exports.updatePet = (req, res) => {
  const db = connectToFB()
  const updateData = req.body
  db.collection('pets').doc(req.params.petId).update(updateData)
  .then(() => this.getAllPets(req, res))
  .catch(err => res.send('error updating', +err.message))
}

exports.deletePet = (req, res) => {
  const db = connectToFB()
  const { petId } = req.params
  db.collection('pets').doc(petId).delete()
  .then(() => this.getAllPets(req, res))
  .catch(err => res.send('error deleting', +err.message))
}