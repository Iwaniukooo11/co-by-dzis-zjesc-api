const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const categories = require('../utils/ingredientCategories')

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    minlength: 3,
  },
  category: {
    type: String,
    enum: categories, //TD -- END
    required: true,
  },
})
ingredientSchema.plugin(uniqueValidator)

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
