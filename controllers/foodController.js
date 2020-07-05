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
    console.log('query ingrs: ', queryIngrs)

    foods = await Food.find()
    foods.forEach((food) => {
      console.log('-------------', food.name)

      let isFound = true
      // try {
      const ingredients = [...food.ingredients]
      ingredients.forEach((obj) => {
        //jeśli nie ma w spisie, a skladnik jest obowiazkowy i jest na liscie obowiazkowych
        if (
          // !queryIngrs.includes(obj.ingredient.name) &&
          !queryIngrs.includes(obj.ingredient.name) &&
          obj.optional === false &&
          !['podstawowe', 'przyprawy'].includes(obj.ingredient.category)
        ) {
          isFound = false
          console.log(
            'DINT FOUND',
            obj.ingredient.name,
            queryIngrs.includes(obj.ingredient.name),
            obj.optional === false,
            ['podstawowe', 'przyprawy'].includes(obj.ingredient.category)
          )
          // throw NotFoundException
        }
      })
      // } catch {}
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
