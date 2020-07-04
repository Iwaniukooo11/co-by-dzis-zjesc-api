const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const timestamps = require('mongoose-timestamp')

const foodSchema = new mongoose.Schema(
  {
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
    portion: {
      type: Number,
      default: 1,
      min: 1,
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
        set: (text) => {
          text = text.trim()
          text = text.charAt(0).toUpperCase() + text.slice(1) //capitalizes a string

          if (text[text.length - 1] === '.')
            text = text.substring(0, text.length - 1) //removes last dot

          return text
        },
      },
    ],
    ingredients: [
      {
        quantity: {
          required: true,
          type: String,
        },
        quantityType: {
          // required: true,
          type: String,
          enum: ['ml', 'g', 'jednostki'],
          default: 'jednostki',
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

foodSchema.virtual('ingredientsQuantity').get(function () {
  return this.ingredients.length
})

// foodSchema.plugin(uniqueValidator)
// foodSchema.plugin(timestamps)
const Food = mongoose.model('Food', foodSchema)

module.exports = Food
