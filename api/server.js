// SUNUCUYU BU DOSYAYA KURUN

const express = require('express')

const UsersModel = require('./users/model')

const server = express()

server.use(express.json())

server.post('/api/users', async (req, res) => {
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

server.get('/api/users', async (req, res) => {
  try {
    const users = await UsersModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı bilgileri alınamadı' })
  }
})

server.get('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const userById = await UsersModel.findById(id)
    if (!userById) {
      res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
    } else {
      res.json(userById)
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı bilgisi alınamadı' })
  }
})

server.put('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const userById = await UsersModel.findById(id)
    if (!userById) {
      res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
    } else {
      const user = req.body
      if (!user.name || !user.bio) {
        res
          .status(400)
          .json({ message: 'Lütfen kullanıcı için bir name ve bio sağlayın' })
      } else {
        const updated = await UsersModel.update(req.params.id, user)
        res.json(updated)
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı bilgileri güncellenemedi' })
  }
})

server.delete(`/api/users/:id`, async (req, res) => {
  try {
    const id = req.params.id
    const userById = await UsersModel.findById(id)
    if (!userById) {
      res.status(404).json({ message: 'Belirtilen ID li kullanıcı bulunamadı' })
    } else {
      const deletedUser = await UsersModel.remove(id)
      res.json(deletedUser)
    }
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı silinemedi' })
  }
})

module.exports = server // SERVERINIZI EXPORT EDİN {}
