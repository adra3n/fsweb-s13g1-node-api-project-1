// SUNUCUYU BU DOSYAYA KURUN

const express = require('express')
const UsersModel = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (res, req) => {
  const users = UsersModel.getAll()
  res.status(200).json(users)
})

// post
// put

module.exports = { server } // SERVERINIZI EXPORT EDİN {}
