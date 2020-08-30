const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const categories = require('../utils/ingredientCategories')

const ingredientPropositionSchema = new mongoose.Schema({
  name: {
    type: String,
    // lowercase: true,
    required: [true, 'Podaj składnik!'],
    minlength: [3, 'Składnik musi mieć minimum 3 znaki długości!'],
  },
})
// ingredientPropositionSchema.plugin(uniqueValidator)

const IngredientProposition = mongoose.model(
  'IngredientProposition',
  ingredientPropositionSchema
)

module.exports = IngredientProposition
