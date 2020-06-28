const express = require('express')
const foodController = require('../controllers/foodController')
const router = express.Router()

router
  .route('/')
  .get(foodController.getAllFoods)
  .post(foodController.createFood)
  .delete(foodController.deleteFood)

router
  .route('/:id')
  .get(foodController.getOneFood)
  .patch(foodController.updateFood)

module.exports = router
