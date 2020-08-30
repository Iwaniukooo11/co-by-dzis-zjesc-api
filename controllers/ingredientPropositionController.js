const catchAsync = require('../utils/catchAsync')
const IngredientProposition = require('../models/ingredientPropositionModel')
const factory = require('./handlerFactory')

exports.createIngredientProposition = factory.createOne(IngredientProposition)
