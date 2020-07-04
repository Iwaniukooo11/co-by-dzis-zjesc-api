const mongoose = require('mongoose')

const moderatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'moderator'],
  },
  email: {
    type: String,
    required: true,
  },
  //   encryptedPassword: {
  //     type: String,
  //     required: true,
  //   },
  password: {
    type: String,
    required: true,
  },
})

const Moderator = mongoose.model('Moderator', moderatorSchema)

module.exports = Moderator
