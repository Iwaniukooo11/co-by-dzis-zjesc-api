const Food = require('../models/foodModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')

// exports.getAllFoods = catchAsync(async (req, res) => {
//   const features = new APIFeatures(Food.find(), req.query).filter()
//   const foods = await features.query

//   console.log(foods)
//   res.status(200).json({
//     test: 'OK',
//     data: foods,
//   })
// })

exports.getAllFoods = factory.getAll(Food)

exports.createFood = factory.createOne(Food)
exports.updateFood = factory.updateOne(Food)
exports.deleteFood = factory.deleteOne(Food)
