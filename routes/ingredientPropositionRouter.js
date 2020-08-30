const express = require('express')
const ingredientPropositionController = require('../controllers/ingredientPropositionController')
const router = express.Router()
const authController = require('../controllers/authController')

router
  .route('/')
  .post(
    authController.checkToken,
    ingredientPropositionController.createIngredientProposition
  )
// .post(ingredientController.createIngredient)
// .delete(ingredientController.deleteIngredient)

module.exports = router
