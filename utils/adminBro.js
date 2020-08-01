const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const Food = require('../models/foodModel')
const Ingredient = require('../models/ingredientModel')
const mongoose = require('mongoose')
const Moderator = require('../models/moderatorModel')

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  databases: [mongoose],
  // resources: [
  //   Food,
  //   Ingredient,
  //   Moderator,
  // {
  //   resource: Moderator,
  //   options: {
  //     properties: {
  //       encryptedPassword: {
  //         isVisible: false,
  //       },
  //       password: {
  //         type: 'string',
  //         isVisible: {
  //           list: false,
  //           edit: true,
  //           filter: false,
  //           show: false,
  //         },
  //       },
  //     },
  //     actions: {
  //       new: {
  //         before: async (request) => {
  //           if (request.payload.record.password) {
  //             request.payload.record = {
  //               ...request.payload.record,
  //               encryptedPassword: await bcrypt.hash(
  //                 request.payload.record.password,
  //                 10
  //               ),
  //               password: undefined,
  //             }
  //           }
  //           return request
  //         },
  //       },
  //     },
  //   },
  // },
  // ],
  rootPath: '/admin',
})

exports.adminBro = adminBro
exports.adminAuth = {
  authenticate: async (email, password) => {
    // console.log('IN FUNC')
    const user = await Moderator.findOne({ email })
    if (user) {
      // const matched = await bcrypt.compare(password, user.encryptedPassword)
      // const matched = password === user.encryptedPassword
      const matched = user.comparePasswords(password, user.password)
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
  // maxAge: 30,
  // expires: new Date(Date.now() + 30 * 1000),
}
