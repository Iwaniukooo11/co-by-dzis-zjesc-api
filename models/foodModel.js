const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const foodSchema = new mongoose.Schema(
  {
    //TD Zaimplementować porcje
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 5,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: Number,
      min: 1,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    content: [
      {
        type: String,
        trim: true,
        min: 8,
        required: true,
      },
    ],
    ingredients: [
      {
        quantity: {
          required: true,
          type: Number,
        },
        optional: {
          type: Boolean,
          default: false,
        },

        ingredient: {
          type: mongoose.Schema.ObjectId,
          ref: 'Ingredient',
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

foodSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'ingredients.ingredient',
    select: 'name category -_id',
  })
  next()
})

foodSchema.plugin(uniqueValidator)
const Food = mongoose.model('Food', foodSchema)

module.exports = Food
