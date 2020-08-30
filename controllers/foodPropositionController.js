const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')
const FoodProposition = require('../models/foodPropositionModel')

exports.createFoodProposition = factory.createOne(FoodProposition)
