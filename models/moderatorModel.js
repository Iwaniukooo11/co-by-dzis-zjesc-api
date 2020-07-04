const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

moderatorSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

moderatorSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const Moderator = mongoose.model('Moderator', moderatorSchema)

module.exports = Moderator
