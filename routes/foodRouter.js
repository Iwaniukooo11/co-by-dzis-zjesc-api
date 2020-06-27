const express = require('express')
const foodController = require('../controllers/foodController')
const router = express.Router()

router
  .route('/')
  .get(foodController.getAllFoods)
  .post(foodController.createFood)
  .patch(foodController.updateFood)
  .delete(foodController.deleteFood)

module.exports = router
