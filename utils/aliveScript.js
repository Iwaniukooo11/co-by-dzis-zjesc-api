const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Food = require('../models/foodModel')
const Ingredient = require('../models/ingredientModel')
const Stats = require('../models/statsModel')

dotenv.config({ path: './config.env' })

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connection succesful'))

const fc = async () => {
  const food = await Food.findOne({ name: 'jajecznica' })
  await Stats.create({ message: 'pls be alive', time: Date.now() })
  console.log('got', food.name)
}
try {
  fc()
} catch (err) {
  console.log(err)
}
// finally {
// process.exit()
// }
