const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const Food = require('../models/foodModel')
const Ingredient = require('../models/ingredientModel')
const mongoose = require('mongoose')

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [Food, Ingredient],
  //   databases: [mongoose],
  rootPath: '/admin',
  //   options: {
  //     actions: {
  //       newAction: {
  //         actionType: 'record',
  //         icon: 'View',
  //         isVisible: true,
  //         handler: async (req, res, context) => {
  //           const Foods = context._admin.findResource('Food')
  //           const food = Food.findOne(context.record.param('_id'))
  //           food.test = 'test'
  //           await food.save()

  //           return {
  //             record: food,
  //           }
  //         },
  //       },
  //     },
  //   },
})

// Build and use a router which will handle all AdminBro routes
// const router = AdminBroExpressjs.buildRouter(adminBro)

module.exports = adminBro
