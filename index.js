const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/data', (req, res) => {
  MongoClient.connect('mongodb://localhost/crud', (err, db) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      process.exit(1)
    }
    const data = db.collection('data')
    data.find().toArray((err, result) => {
      if (err) {
        console.error(err)
        res.sendStatus(500)
      }
      else {
        res.send(result)
      }
    })
  })
})

app.post('/data', (req, res) => {
  console.log(req.body)
  MongoClient.connect('mongodb://localhost/crud', (err, db) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      process.exit(1)
    }
    const data = db.collection('data')
    data.insertOne(req.body, (err, result) => {
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

app.listen('3000', () => {
  console.log('Listening on :3000...')
})
