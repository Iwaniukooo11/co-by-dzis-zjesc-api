// db.posts.find( //query today up to tonight
//     {"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
//!!ABOVE IMPORTANT QUERY
// https://stackoverflow.com/questions/11973304/mongodb-mongoose-querying-at-a-specific-date

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const logSchema = new mongoose.Schema({
  message: String,
  time: Date,
})

const Log = mongoose.model('Log', logSchema)

module.exports = Log
