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

  category: {
    type: String,
    enum: ['warzywa', 'owoce', 'przyprawy', 'nabiał', 'pieczywo'], //TD -- END
    required: true,
  },
})
ingredientSchema.plugin(uniqueValidator)

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
