const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      // trim: true,
      minlength: 5,
      // lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: Number,
      min: 1,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    content: [
      {
        type: String,
        trim: true,
        min: 8,
        required: true,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
foodSchema.plugin(uniqueValidator)
const Food = mongoose.model('Food', foodSchema)

module.exports = Food
