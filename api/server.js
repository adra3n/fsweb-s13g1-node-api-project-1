// SUNUCUYU BU DOSYAYA KURUN

const express = require('express')
const UsersModel = require('./users/model')

const server = express()

server.use(express.json())

server.post('/api/users', async (res, req) => {
  try {
    const payload = req.body
    if (!payload.name || !payload.bio) {
      res
        .status(400)
        .json({ message: 'Lütfen kullanıcı için bir name ve bio sağlayın' })
    } else {
      const inserted = await UsersModel.insert(payload)
      res.status(201).json(inserted)
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Veritabanına kaydedilirken bir hata oluştu' })
  }
})

server.get('/api/users', async (res, req) => {
  try {
    const payload = req.body
    UsersModel.find()
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı bilgileri alınamadı' })
  }
  const users = UsersModel.find()
  res.status(200).json(users)
})

server.get('/api/users:id', async (res, req) => {
  try {
    let id = req.params.id
    let userById = await UsersModel.findById(id)
    if (!userById) {
      res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
    } else {
      res.json(userById)
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı bilgisi alınamadı' })
  }
  const users = UsersModel.find()
  res.status(200).json(users)
})

server.delete(`/api/users/:id`, async (res, req) => {
  try {
    let id = req.params.id
    let userById = await UsersModel.findById(id)
    if (!userById) {
      res.status(404).json({ message: 'Belirtilen ID li kullanıcı bulunamadı' })
    } else {
      let deletedUser = await UsersModel.remove(id)
      res.json(deletedUser)
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı silinemedi' })
  }
})

module.exports = { server } // SERVERINIZI EXPORT EDİN {}
