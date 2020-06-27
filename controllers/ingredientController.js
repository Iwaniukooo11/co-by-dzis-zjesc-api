const Ingredient = require('../models/ingredientModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllIngredients = catchAsync(async (req, res) => {
  const features = new APIFeatures(Food.find(), req.query).filter()
  const ingredients = await features.query

  res.status(200).json({
    test: 'OK',
    data: ingredients,
  })
})

exports.createIngredient = factory.createOne(Ingredient)
exports.updateIngredient = factory.updateOne(Ingredient)
exports.deleteIngredient = factory.deleteOne(Ingredient)
