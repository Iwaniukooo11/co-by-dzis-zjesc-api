const Food = require('../models/foodModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllFoods = catchAsync(async (req, res) => {
  //TD - Zaimplementować dobre query
  let foodsOk = []
  let foods = []
  const limit = req.query.limit * 1 || 10

  if (req.query.ingredients) {
    const queryIngrs = req.query.ingredients.split(',')
    console.log(queryIngrs)

    foods = await Food.find()
    foods.forEach((food) => {
      const ingredients = [...food.ingredients]

      let isFound = false
      try {
        ingredients.forEach((obj) => {
          if (
            // !queryIngrs.includes(obj.ingredient.name) &&
            queryIngrs.includes(obj.ingredient.name) &&
            obj.optional == false
          ) {
            isFound = true
            throw FoundException
          }
        })
      } catch {}
      if (isFound) {
        // if (foodsOk.length < limit) foodsOk.push(food)
        // else return
        foodsOk.push(food)
      }
    })
    console.log('foodOk1: ', foodsOk)
    foodsOk.sort(
      (objA, objB) => objB.ingredientsQuantity - objA.ingredientsQuantity
    )
    console.log('foodOk2Sorted: ', foodsOk)

    foods = []
    foodsOk.forEach((el, i) => {
      if (i < limit) foods.push(el)
    })
    // foods = [...foodsOk]
  } else {
    let filter = {}

    const features = new APIFeatures(Food.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate()
    foods = await features.query
  }

  res.status(200).json({
    test: 'OK',
    results: foods.length,
    data: {
      data: foods,
    },
  })
})

exports.getOneFood = factory.getOne(Food)
exports.createFood = factory.createOne(Food)
exports.updateFood = factory.updateOne(Food)
exports.deleteFood = factory.deleteOne(Food)
