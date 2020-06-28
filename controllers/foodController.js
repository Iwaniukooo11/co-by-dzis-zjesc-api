const Food = require('../models/foodModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')

exports.getAllFoods = catchAsync(async (req, res) => {
  //TD - Zaimplementować dobre query
  let foodsOk = []
  let foods = []

  console.log(req.query)

  if (req.query.ingredients) {
    const queryIngrs = req.query.ingredients.split(',')
    console.log(queryIngrs)

    foods = await Food.find()
    console.log(foods[0].ingredients)
    foods.forEach((food) => {
      const names = food.ingredients.map((obj) => obj.ingredient.name)
      console.log('names: ', names)

      let isFound = true
      // try {
      names.forEach((ingr) => {
        if (!queryIngrs.includes(ingr)) {
          isFound = false
          // throw FoundException
        }
      })
      // } catch {}
      if (isFound) foodsOk.push(food)
    })
    foods = foodsOk
  } else {
    console.log('there')
    let filter = {}

    const features = new APIFeatures(Food.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate()
    foods = await features.query
    console.log(foods)
  }

  // const foods = await Food.find()
  console.log(foods)
  res.status(200).json({
    test: 'OK',
    quantity: foods.length,
    data: {
      data: foods,
    },
  })
})

// exports.getAllFoods = factory.getAll(Food)

exports.createFood = factory.createOne(Food)
exports.updateFood = factory.updateOne(Food)
exports.deleteFood = factory.deleteOne(Food)
