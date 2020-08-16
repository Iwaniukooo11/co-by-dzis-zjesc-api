const Food = require('../models/foodModel')
const Stats = require('../models/statsModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
const randomize = require('randomize-array')
const equal = require('deep-equal')

exports.getAllFoods = catchAsync(async (req, res, next) => {
  let foodsOk = []
  let foods = []
  const limit = req.query.limit * 1 || 10

  if (req.query.ingredients) {
    const queryIngrs = req.query.ingredients.split(',')
    console.log('query ingrs: ', queryIngrs)

    const max = {
      quantity: 0,
      food: {
        name: '',
      },
    }
    foods = await Food.find()
    foods.forEach((food) => {
      // console.log('-------------', food.name)

      let isFound = true
      const ingredients = [...food.ingredients]
      ingredients.forEach((obj) => {
        //jeśli nie ma w spisie, a skladnik jest obowiazkowy i jest na liscie obowiazkowych
        if (
          !queryIngrs.includes(obj.ingredient.name) &&
          obj.optional === false &&
          !['podstawowe', 'przyprawy'].includes(obj.ingredient.category)
        ) {
          isFound = false
        }
      })
      if (isFound) {
        foodsOk.push(food)
        // console.log('pushed food:', food)
        if (food.ingredientsQuantity > max.quantity) {
          max.quantity = food.ingredientsQuantity
          max.food = food
        }
      }
    })
    // console.log('MAX FOOD: ', max.food)
    foodsOk = randomize(foodsOk) //test, inserts food with biggest ingr quantity into beginning and removes it from other indexes in arr TO OPTIMIZE
    foodsOk = foodsOk.filter((obj, i) => obj.name !== (max.food.name || ':('))
    console.log('max: ', max.food.name)
    if (
      (foodsOk[0] && foodsOk[0].name ? foodsOk[0].name : '') !==
      (max.food.name || ':(')
    )
      foodsOk.unshift(max.food)

    foods = []
    foodsOk.forEach((el, i) => {
      if (i < limit) foods.push(el)
    })
  } else {
    let filter = {}

    const features = new APIFeatures(Food.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate()
    foods = (await features.query) || []
  }
  // console.log('foods: ', foods)
  console.log('\x1b[32m', `returned ${foods.length} foods`)
  req.foods = [...foods]
  next()
})

exports.runStats = catchAsync(async (req, res, next) => {
  await Stats.create({
    foods: req.foods || [],
    quantity: req.foods.length || 0,
    ingredients: req.query.ingredients.split(','),
  })
  next()
})

exports.returnFood = catchAsync(async (req, res) => {
  res.status(200).json({
    test: 'OK',
    results: req.foods.length,
    data: {
      data: req.foods,
    },
  })
})
exports.getOneFood = factory.getOne(Food)
exports.createFood = factory.createOne(Food)
exports.updateFood = factory.updateOne(Food)
exports.deleteFood = factory.deleteOne(Food)
