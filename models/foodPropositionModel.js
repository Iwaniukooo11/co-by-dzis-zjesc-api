const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const timestamps = require('mongoose-timestamp')

const foodPropositionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Podaj tytuł'],
      minlength: [5, 'Nazwa powinna mieć minimum 5 znaków'],
      maxlength: [50, 'Nazwa powinna mieć maksymalnie 50 znaków'],
    },
    author: {
      type: String,
      required: [true, 'Podaj nick'],
      required: [true, 'Podaj tytuł'],
      minlength: [5, 'Nick powinien mieć minimum 5 znaków'],
      maxlength: [50, 'Nick powinien mieć maksymalnie 30 znaków'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: Number,
      min: 1,
      max: 999,
      required: [true, 'Podaj czas'],
    },
    portion: {
      type: Number,
      min: 1,
      max: 99,
    },
    ingredients: {
      type: String,
      minlength: [15, 'Składniki powinny mieć minimum 15 znaków'],
    },
    content: {
      type: String,
      minlength: [20, 'Przepis powinien mieć minimum 20 znaków'],
    },
    stuff: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// foodSchema.plugin(uniqueValidator)
// foodSchema.plugin(timestamps)
const FoodProposition = mongoose.model('FoodProposition', foodPropositionSchema)

module.exports = FoodProposition