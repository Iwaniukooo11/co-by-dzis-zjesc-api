const express = require('express')
const foodController = require('../controllers/foodController')
const router = express.Router()
const authController = require('../controllers/authController')

router
  .route('/')
  .get(
    foodController.getAllFoods,
    foodController.runStats,
    foodController.returnFood
  )
// .post(foodController.createFood)
// .delete(foodController.deleteFood)

router
  .route('/:id')
  .get(foodController.getOneFood)
  .patch(authController.checkToken, foodController.updateFood)

module.exports = router
