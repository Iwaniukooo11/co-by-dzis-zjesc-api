const express = require('express')
const ingredientController = require('../controllers/ingredientController')
const router = express.Router()

router
  .route('/')
  .get(ingredientController.getAllIngredients)
  .post(ingredientController.createIngredient)
  .patch(ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient)

module.exports = router
