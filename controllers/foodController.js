const Food = require('../models/foodModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
const randomize = require('randomize-array')
const equal = require('deep-equal')

exports.getAllFoods = catchAsync(async (req, res) => {
  //TD - Zaimplementować dobre query
  let foodsOk = []
  let foods = []
  const limit = req.query.limit * 1 || 10

  if (req.query.ingredients) {
    const queryIngrs = req.query.ingredients.split(',')
    console.log('query ingrs: ', queryIngrs)

    const max = {
      quantity: 0,
      food: null,
    }
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
          // console.log(
          //   'DINT FOUND',
          //   obj.ingredient.name,
          //   queryIngrs.includes(obj.ingredient.name),
          //   obj.optional === false,
          //   // ['podstawowe', 'przyprawy'].includes(obj.ingredient.category)
          //   ['przyprawy'].includes(obj.ingredient.category)
          // )
          // throw NotFoundException
        }
      })
      // } catch {}
      if (isFound) {
        // if (foodsOk.length < limit) foodsOk.push(food)
        // else return
        foodsOk.push(food)
        console.log('pushed food:', food)
        if (food.ingredientsQuantity > max.quantity) {
          max.quantity = food.ingredientsQuantity
          max.food = food
        }
      }
    })
    // console.log('foodOk1: ', foodsOk)
    // foodsOk.sort(
    //   (objA, objB) => objB.ingredientsQuantity - objA.ingredientsQuantity
    // )
    // console.log('foodOk2Sorted: ', foodsOk)
    console.log('MAX FOOD: ', max.food)
    foodsOk = randomize(foodsOk) //test, inserts food with biggest ingr quantity into beginning and removes it from other indexes in arr TO OPTIMIZE

    // if (foodsOk[0].name !== max.food.name) foodsOk.unshift(max.food)
    foodsOk = foodsOk.filter((obj, i) => obj.name !== max.food.name)
    if (foodsOk[0].name !== max.food.name) foodsOk.unshift(max.food)

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
