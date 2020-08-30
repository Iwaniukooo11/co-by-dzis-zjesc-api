const express = require('express')
const foodPropositionController = require('../controllers/foodPropositionController')
const router = express.Router()
const authController = require('../controllers/authController')

router
  .route('/')
  .post(
    authController.checkToken,
    foodPropositionController.createFoodProposition
  )
// .post(foodController.createFood)
// .delete(foodController.deleteFood)

// router
//   .route('/:id')
//   .get(foodController.getOneFood)
//   .patch(authController.checkToken, foodController.updateFood)

module.exports = router
