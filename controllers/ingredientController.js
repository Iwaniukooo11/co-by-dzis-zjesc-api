const Ingredient = require('../models/ingredientModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')

let categories = require('../utils/ingredientCategories')

exports.getAllIngredients = factory.getAll(Ingredient)
exports.createIngredient = factory.createOne(Ingredient)
exports.updateIngredient = factory.updateOne(Ingredient)
exports.deleteIngredient = factory.deleteOne(Ingredient)

exports.getAllCategories = catchAsync(async (req, res) => {
  categories = categories.filter(
    // (cat) => !['podstawowe', 'przyprawy'].includes(cat)
    (cat) => !['przyprawy'].includes(cat)
  )
  res.status(200).json({
    status: 'OK',
    results: categories.length,
    data: {
      data: categories,
    },
  })
})
