// db.posts.find( //query today up to tonight
//     {"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
//!!ABOVE IMPORTANT QUERY
// https://stackoverflow.com/questions/11973304/mongodb-mongoose-querying-at-a-specific-date

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const statsSchema = new mongoose.Schema({
  foods: [
    {
      name: String,
      category: String,
      _id: mongoose.Schema.ObjectId,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Stats = mongoose.model('Stats', statsSchema)

module.exports = Stats
