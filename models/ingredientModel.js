const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    minlength: 3,
  },
  optional: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['warzywa', 'owoce', 'przyprawy', 'nabiał'], //TD -- END
    required: true,
  },
})
ingredientSchema.plugin(uniqueValidator)

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
