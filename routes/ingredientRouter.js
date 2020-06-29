const express = require('express')
const ingredientController = require('../controllers/ingredientController')
const router = express.Router()

router
  .route('/')
  .get(ingredientController.getAllIngredients)
  .post(ingredientController.createIngredient)
  .delete(ingredientController.deleteIngredient)

router.route('/:id').patch(ingredientController.updateIngredient)
router.route('/all-categories').get(ingredientController.getAllCategories)

module.exports = router
