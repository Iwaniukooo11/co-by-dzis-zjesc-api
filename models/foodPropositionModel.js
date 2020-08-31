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
      type: String,
      minlength: 1,
      maxlength: 3,
      required: [true, 'Podaj czas'],
    },
    portion: {
      type: String,
      minlength: 1,
      maxlength: 2,
      required: [true, 'Podaj porcje'],
    },
    ingredients: {
      type: String,
      required: [true, 'Podaj składniki'],
      minlength: [15, 'Składniki powinny mieć minimum 15 znaków'],
    },
    content: {
      type: String,
      required: [true, 'Podaj przepis'],
      minlength: [20, 'Przepis powinien mieć minimum 20 znaków'],
    },
    stuff: [
      {
        type: String,
        default: [],
        enum: ['Piekarnik', 'Blender', 'Mikrowela'],
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
