const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/notes', (req, res) => {
  MongoClient.connect('mongodb://localhost/notes-app', (err, db) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.find().toArray((err, result) => {
      if (err) {
        console.error(err)
        res.sendStatus(500)
      }
      else {
        res.send(result)
      }
    })
    db.close()
  })
})

app.post('/notes', (req, res) => {
  MongoClient.connect('mongodb://localhost/notes-app', (err, db) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.insertOne(req.body, (err, result) => {
      if (err) {
        console.error(err)
        res.sendStatus(500)
      }
      else {
        res.sendStatus(201)
      }
    })
    db.close()
  })
})

app.put('/notes/:id', (req, res) => {
  MongoClient.connect('mongodb://localhost/notes-app', (err, db) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.update({id: req.params.id}, {$set: req.body}, (err, result) => {
      if (err) {
        console.error(err)
        res.sendStatus(500)
      }
      else {
        res.send(result)
      }
    })
    db.close()
  })
})

app.listen('3000', () => {
  console.log('Listening on :3000...')
})
